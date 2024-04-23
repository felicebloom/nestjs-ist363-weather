"use client";

// core components
import { useState, useEffect } from "react";

import Image from "next/image";

// custom components
import Button from "..//components/Button";
import Col from "..//components/Col";
import Container from "..//components/Container";
import List from "../components/List";
import Row from "..//components/Row";
import Tabs from "../components/Tabs";

import { getGeoLocation, getPeople, getWeatherDataByLatLon } from "../lib/api";

const Homepage = () => {
  const [loading, setloading] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [daysOfWeek, setDaysOfWeek] = useState(null);
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  //const peopleArr = getPeople();

  useEffect(() => {
    getGeoLocation()
      .then((position) => {
        console.log(position);
        setLocation(position);
      })
      .catch((error) => {
        setErrorMsg(error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getWeatherDataByLatLon(location);
      setWeatherData(response);
      setloading(false);
    };
    location ? fetchData() : null;
  }, [location]);

  useEffect(() => {
    // filter out the days of the week
    const tempWeek = [];

    weatherData &&
      weatherData.list.filter((block) => {
        const date = new Date(block.dt * 1000);
        const options = { weekday: "short" };
        const day = date.toLocaleDateString("en-US", options);
        //console.log(day);
        if (!tempWeek.includes(day)) {
          tempWeek.push(day);
        }
      });

    setDaysOfWeek(tempWeek);

    // then set state with the days of the week
  }, [weatherData]);

  //console.log({ peopleArr });
  return (
    <div>
      {errorMsg && <div>{errorMsg} </div>}
      {loading ? (
        <Container>
          <p>Loading...</p>
        </Container>
      ) : (
        <Container>
          <Row>
            <Col xs={6} sm={3} md={4}>
              <h2>{weatherData.city.name}</h2>
              <p>Current temp: {weatherData.list[0].main.temp}&deg; F</p>
              <p>{weatherData.list[0].weather[0].description}</p>
              <Image
                src={`https://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`}
                alt={`Weather icon for ${weatherData.list[0].weather[0].description}}`}
                width={100}
                height={100}
              />
            </Col>
            <Col sm={9} md={8}>
              {weatherData && daysOfWeek && (
                <section>
                  <Tabs
                    activeIndex={activeDayIndex}
                    items={daysOfWeek}
                    clickHandler={setActiveDayIndex}
                  />
                  <List
                    activeIndex={activeDayIndex}
                    items={weatherData.list}
                    daysOfWeek={daysOfWeek}
                  />
                </section>
              )}
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};
export default Homepage;
