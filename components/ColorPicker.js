const colors = [
  {
    name: "red",
    value: "#ff0000",
  },
];

const ColorPicker = () => {
  return (
    <div
      style={{
        backgroundcolor: colors[0].value,
      }}
    >
      Color picker
    </div>
  );
};
export default ColorPicker;
