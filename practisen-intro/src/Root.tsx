import "./index.css";
import { Composition } from "remotion";
import { Intro } from "./Intro";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="PractisenIntro"
        component={Intro}
        durationInFrames={210}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
