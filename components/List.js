import Row from "./Row";

const List = ({ activeIndex, daysOfWeek, items }) => {
  return (
    <div>
      {items
        .filter((block) => {
          const date = new Date(block.dt * 1000);
          const options = { weekday: "short" };
          const day = date.toLocaleDateString("en-US", options);
          return day === daysOfWeek[activeIndex];
        })
        .map((block, index) => {
          return (
            <Row key={index}>
              <Col xs={3} sm={2}>
                time
              </Col>
              <Col xs={6} sm={4}>
                {block.main.temp}
              </Col>
              <Col xs={3} sm={2}>
                Icon goes here
              </Col>
            </Row>
          );
        })}
    </div>
  );
};
export default List;
