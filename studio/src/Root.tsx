import "./index.css";
import { Still } from "remotion";
import { StudioScene } from "./StudioScene";

const WIDE = { width: 1920, height: 1080 } as const;
const MOBILE = { width: 1080, height: 1920 } as const;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Still
        id="studio-male-wide"
        component={StudioScene}
        defaultProps={{ host: "male" as const, orientation: "wide" as const }}
        {...WIDE}
      />
      <Still
        id="studio-female-wide"
        component={StudioScene}
        defaultProps={{ host: "female" as const, orientation: "wide" as const }}
        {...WIDE}
      />
      <Still
        id="studio-empty-wide"
        component={StudioScene}
        defaultProps={{ host: "none" as const, orientation: "wide" as const }}
        {...WIDE}
      />
      <Still
        id="studio-male-mobile"
        component={StudioScene}
        defaultProps={{ host: "male" as const, orientation: "mobile" as const }}
        {...MOBILE}
      />
      <Still
        id="studio-female-mobile"
        component={StudioScene}
        defaultProps={{
          host: "female" as const,
          orientation: "mobile" as const,
        }}
        {...MOBILE}
      />
      <Still
        id="studio-empty-mobile"
        component={StudioScene}
        defaultProps={{ host: "none" as const, orientation: "mobile" as const }}
        {...MOBILE}
      />
    </>
  );
};
