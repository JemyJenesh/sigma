import React, {useState, useEffect} from 'react';
import {Dimensions, Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Card} from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';

const ProductCarousel = ({images}) => {
  const carouselRef = React.useRef();
  const {width} = Dimensions.get('window');
  const [primaryIndex, setPrimaryIndex] = useState(0);

  const _renderImage = ({item, index}) => {
    return <CarouselItem item={item} index={index} images={images} />;
  };

  useEffect(() => {
    images.forEach((image, index) => {
      if (image.is_primary) {
        setPrimaryIndex(index);
      }
    });
  }, [images]);

  return (
    <Carousel
      firstItem={primaryIndex}
      initialScrollIndex={primaryIndex}
      getItemLayout={(data, index) => ({
        length: width - 64,
        offset: (width - 64) * index,
        index,
      })}
      ref={carouselRef}
      data={images}
      renderItem={_renderImage}
      sliderWidth={width}
      itemWidth={width - 64}
    />
  );
};

const CarouselItem = ({item, index, images}) => {
  const [open, setOpen] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  useEffect(() => {
    const tempImages = images.map((i) => ({url: i.image_url}));
    setImageUrls(tempImages);
  }, []);
  return (
    <>
      <Card onPress={() => setOpen(true)}>
        <Card.Cover source={{uri: item.image_url}} />
      </Card>
      <Modal
        visible={open}
        transparent={true}
        onRequestClose={() => setOpen(false)}>
        <ImageViewer
          enableSwipeDown
          index={index}
          onSwipeDown={() => setOpen(false)}
          imageUrls={imageUrls}
        />
      </Modal>
    </>
  );
};

export default ProductCarousel;
