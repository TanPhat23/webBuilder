import { Pointer } from "lucide-react";
import React, { useEffect, useState } from "react";
import Joyride, {
  ACTIONS,
  EVENTS,
  STATUS,
  CallBackProps,
  Step,
} from "react-joyride";

type Props = {
  start: boolean;
  setStartTour: (value: boolean) => void;
  onTourEnd: () => void;
};

const EditorJoyRide: React.FC<Props> = ({ start, onTourEnd, setStartTour }) => {
  const [run, setRun] = useState(false);

  useEffect(() => {
    setRun(start);
  }, [start]);

  const steps: Step[] = [
    {
      
      target: ".editor-component",
      content: (
        <div className="tour-content">
          <h2 className="text-xl font-bold mb-3">Welcome to the Editor</h2>
          <p className="text-gray-700">
            This is where your creativity comes to life! Design beautiful
            websites with our intuitive editor.
          </p>
        </div>
      ),
      disableBeacon: true,
      placement: "center",
      spotlightPadding: 15,
    },
    {
      target: ".canva-component",
      content: (
        <div className="tour-content">
          <h2 className="text-xl font-bold mb-3">Canvas</h2>
          <p className="text-gray-700">
            Your design workspace. Drag components here to build your layout and
            see changes in real-time.
          </p>
        </div>
      ),
      spotlightClicks: true,
      placement: "left-start",
      spotlightPadding: 10,
      offset: -200,
    },
    {
      target: ".sidebar-components",
      content: (
        <div className="tour-content">
          <h2 className="text-xl font-bold mb-3">Components Library</h2>
          <p className="text-gray-700">
            Discover a wide range of components that you can drag and drop onto
            your <span className="font-bold">Canvas</span>.
          </p>
          <div className="mt-2 text-gray-500 text-sm">
            Try different elements to create the perfect layout!
          </div>
        </div>
      ),
      disableBeacon: true,
      placement: "right",
      spotlightPadding: 5,
    },
    {
      target: ".imageupload-component",
      content: (
        <div className="tour-content">
          <h2 className="text-xl font-bold mb-3">Image Upload</h2>
          <p className="text-gray-700">
            Upload and manage your images here. Add your brand assets, photos,
            and graphics.
          </p>
        </div>
      ),
      disableBeacon: true,
      placement: "bottom",
      spotlightPadding: 8,
    },
    {
      target: ".sidebar-layout",
      content: (
        <div className="tour-content">
          <h2 className="text-xl font-bold mb-3">Layout Manager</h2>
          <p className="text-gray-700">
            See all components currently on your canvas. Organize and rearrange
            them easily.
          </p>
        </div>
      ),
      disableBeacon: true,
      placement: "right-start",
      spotlightPadding: 8,
    },
    {
      target: ".config-components",
      content: (
        <div className="tour-content">
          <h2 className="text-xl font-bold mb-3">Component Settings</h2>
          <p className="text-gray-700">
            Customize every aspect of your components - colors, sizes, spacing,
            and more.
          </p>
          <div className="mt-3 p-2 bg-blue-50 rounded-md text-sm">
            <strong>Pro tip:</strong> Use the style presets to quickly apply
            consistent styling across your design.
          </div>
        </div>
      ),
      disableBeacon: true,
      placement: "left",
      spotlightPadding: 10,
    },
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;

    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
      setStartTour(false);
      onTourEnd();
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      callback={handleJoyrideCallback}
      showProgress={true}
      showSkipButton={true}
      continuous={true}
      styles={{
        options: {
          zIndex: 1000,
          backgroundColor: "#FFFFFF",
          primaryColor: "#1c7bd4",
        },
        tooltip: {
          borderRadius: "0.75rem",
          padding: "1rem",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
        },
        tooltipContainer: {
          textAlign: "left",
          lineHeight: 1.5,
        },
        tooltipTitle: {
          fontSize: "1.25rem",
          fontWeight: 700,
          marginBottom: "0.5rem",
        },
        buttonNext: {
          backgroundColor: "#3b82f6",
          borderRadius: "0.375rem",
          color: "#ffffff",
          padding: "0.5rem 1rem",
          fontWeight: 600,
        },
        buttonBack: {
          marginRight: "0.75rem",
          color: "#4b5563",
          fontWeight: 500,
        },
        buttonSkip: {
          color: "#6b7280",
        },
      }}
    />
  );
};

export default EditorJoyRide;
