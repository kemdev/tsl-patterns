/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

// // import all images from the images directory
// // import image1 from "./images/image1.png";
// // import image2 from "./images/image2.png";
// // import image3 from "./images/image3.png";
// // import image4 from "./images/image4.png";
// // import image5 from "./images/image5.png";
// // import image6 from "./images/image6.png";
// // import image7 from "./images/image7.png";
// // import image8 from "./images/image8.png";
// // import image9 from "./images/image9.png";
// // import image10 from "./images/image10.png";

// const images = [
//   "./images/image1.png",
//   "./images/image2.png",
//   "./images/image3.png",
//   "./images/image4.png",
//   "./images/image5.png",
//   "./images/image6.png",
//   "./images/image7.png",
//   "./images/image8.png",
//   "./images/image9.png",
//   "./images/image10.png",
// ];

// const patternObject = ({
//   image: imageUrl,
//   isAnimatedPattern = false,
//   isParallax = false,
// }: {
//   image: string;
//   isAnimatedPattern?: boolean;
//   isParallax?: boolean;
// }) => {
//   return {
//     image: imageUrl,
//     isAnimatedPattern,
//     isParallax,
//   };
// };

// const pattern1 = patternObject({ image: images[0] });
// const pattern2 = patternObject({ image: images[1] });
// const pattern3 = patternObject({ image: images[2] });
// const pattern4 = patternObject({ image: images[3] });
// const pattern5 = patternObject({ image: images[4] });
// const pattern6 = patternObject({ image: images[5] });
// const pattern7 = patternObject({ image: images[6] });
// const pattern8 = patternObject({ image: images[7] });
// const pattern9 = patternObject({ image: images[8], isAnimatedPattern: true });
// const pattern10 = patternObject({
//   image: images[9],
//   isAnimatedPattern: true,
//   isParallax: true,
// });

// const patterns = [
//   pattern1,
//   pattern2,
//   pattern3,
//   pattern4,
//   pattern5,
//   pattern6,
//   pattern7,
//   pattern8,
//   pattern9,
//   pattern10,
// ];

// export { patterns };

type PatternFeature = "animated" | "parallax" | "interactive";

type Pattern = {
  id: number;
  image: string;
  features?: PatternFeature[];
};

export const patterns: Pattern[] = Array.from({ length: 10 }, (_, index) => {
  const id = index + 1;

  return {
    id,
    image: `/images/pattern${id}.png`,
    features:
      id === 9
        ? ["animated"]
        : id === 10
          ? ["animated", "parallax"]
          : undefined,
  };
});
