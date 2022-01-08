import dynamic from "next/dynamic";

const LoadingProductList = dynamic(() =>
  import("./Loading/LoadingProductList")
);
const LoadingSkeletonText = dynamic(() =>
  import("./Loading/LoadingSkeletonText")
);
const LoadingSkeletonDescription = dynamic(() =>
  import("./Loading/LoadingSkeletonDescription")
);
const LoadingSkeletonImage = dynamic(() =>
  import("./Loading/LoadingSkeletonImage")
);
const ButtonSelected = dynamic(() => import("./Button/ButtonSelected"), {
  loading: () => <LoadingSkeletonText />,
});
const Purchase = dynamic(() => import("./Purchase"), {
  loading: () => <LoadingSkeletonText />,
});
const ProducList = dynamic(() => import("./ProductList"), {
  loading: () => <LoadingProductList />,
});
const ImageSlider = dynamic(() => import("./ImageSlider"), {
  loading: () => <LoadingSkeletonImage />,
});
const TextTitle = dynamic(() => import("./Text/TextTitle"), {
  loading: () => <LoadingSkeletonText />,
});
const TextPrice = dynamic(() => import("./Text/TextPrice"), {
  loading: () => <LoadingSkeletonText />,
});
const TextDescription = dynamic(() => import("./Text/TextDescription"), {
  loading: () => <LoadingSkeletonDescription />,
});
const Message = dynamic(() => import("./Message"));

export {
  ProducList,
  LoadingProductList,
  ImageSlider,
  TextTitle,
  TextPrice,
  TextDescription,
  Purchase,
  LoadingSkeletonText,
  LoadingSkeletonDescription,
  LoadingSkeletonImage,
  ButtonSelected,
  Message,
};
