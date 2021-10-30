import axios from "axios";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import logo from "./logo.svg";
export default function App() {
  const [cars, setCars] = useState(null);
  const [users, setUsers] = useState(null);

  const buymerc = async () => {
    const merc = await axios.post(
      "https://617bab06d842cf001711bfa8.mockapi.io/cars",
      {
        name: "mercedes",
        car: "https://www.pngplay.com/wp-content/uploads/6/Black-Convertible-Car-Transparent-Background.png",
        isGold: false,
        isAvailable: true,
        userId: "0",
      }
    );
    setCars([...cars, merc.data]);
    console.log(merc.data);
  };
  const buylambo = async () => {
    const lambo = await axios.post(
      "https://617bab06d842cf001711bfa8.mockapi.io/cars",
      {
        name: "lambo",
        car: "https://www.lamborghini.com/sites/it-en/files/DAM/lamborghini/facelift_2019/homepage/families-gallery/mobile/Aventador_ultimae_model_mobile.png",
        isGold: true,
        isAvailable: true,
        userId: "0",
      }
    );
    setCars([...cars, lambo.data]);
    console.log(lambo.data);
  };
  const handleUsersTaken = async (e) => {
    console.log("taken users? e=>", e);
    setUsers(
      users.map((user) => {
        return user.id === e.data.id ? e.data : user;
      })
    );
  };
  const handleCarsTaken = async (e) => {
    console.log("taken cars? e=>", e);
    setCars(
      cars.map((car) => {
        return car.id === e.data.id ? e.data : car;
      })
    );
  };
  const handleCars = async (e) => {
    console.log("cars? e=>", e);
    setCars(
      cars.map((car) => {
        return car.id === e.data.id ? e.data : car;
      })
    );
  };
  const handleUsers = async (e) => {
    console.log("users? e=>", e);
    setUsers(
      users.map((user) => {
        return user.id === e.data.id ? e.data : user;
      })
    );
  };
  const getCars = async () => {
    const cars = await axios.get(
      "https://617bab06d842cf001711bfa8.mockapi.io/cars"
    );
    setCars([...cars.data]);
  };
  const getUsers = async () => {
    const users = await axios.get(
      "https://617bab06d842cf001711bfa8.mockapi.io/users"
    );
    setUsers([...users.data]);
  };
  useEffect(() => {
    getCars();
    getUsers();
  }, []);
  return (
    <Router>
      <div>
        <nav>
          <div className="flex">
            <p>
              <Link className="link" to="/">
                Home
              </Link>
            </p>
            <p>
              <Link className="link" to="/about">
                Cars
              </Link>
            </p>
            <p>
              <Link className="link" to="/users">
                Users
              </Link>
            </p>
          </div>
          <div
            className="img App-logo"
            style={{ backgroundImage: `url(${logo})` }}
          >
            {/* <img src={logo} className="App-logo" alt="logo" /> */}
          </div>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About cars={cars} />
          </Route>
          <Route path="/users">
            <Users users={users} />
          </Route>
          <Route path="/">
            <Home
              cars={cars}
              users={users}
              handleUsersTaken={(e) => {
                handleUsersTaken(e);
              }}
              handleCarsTaken={(e) => {
                handleCarsTaken(e);
              }}
              handleCars={(e) => {
                handleCars(e);
              }}
              handleUsers={(e) => {
                handleUsers(e);
              }}
              buylambo={buylambo}
              buymerc={buymerc}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home({
  users,
  cars,
  handleUsersTaken,
  handleCarsTaken,
  handleCars,
  handleUsers,
  buylambo,
  buymerc,
}) {
  const [userId, setUserId] = useState(null);
  const [carId, setCarId] = useState(null);
  const matchCarWithUser = async () => {
    if (!carId.isAvailable) {
      const userResponseTaken = await axios.put(
        "https://617bab06d842cf001711bfa8.mockapi.io/users/" + carId.userId,
        { isCar: false, carId: "0" }
      );
      handleUsersTaken(userResponseTaken);
    }
    if (userId.isCar) {
      const carResponseTaken = await axios.put(
        "https://617bab06d842cf001711bfa8.mockapi.io/cars/" + userId.carId,
        { isAvailable: true, userId: "0" }
      );
      handleCarsTaken(carResponseTaken);
    }
    const carResponse = await axios.put(
      "https://617bab06d842cf001711bfa8.mockapi.io/cars/" + carId.id,
      { isAvailable: false, userId: `${userId.id}` }
    );
    const userResponse = await axios.put(
      "https://617bab06d842cf001711bfa8.mockapi.io/users/" + userId.id,
      { isCar: true, carId: `${carId.id}` }
    );
    console.log("carResponse", carResponse);
    handleCars(carResponse);
    console.log("userResponse", userResponse);
    handleUsers(userResponse);
  };
  const userFilterhandler = (id) => {
    setUserId(
      users.filter((user) => {
        return user.id === id;
      })[0]
    );
    console.log(userId);
  };
  const carFilterhandler = (id) => {
    setCarId(
      cars.filter((car) => {
        return car.id === id;
      })[0]
    );
    console.log(carId);
  };
  return (
    <div className="home">
      <div className="inner-home">
        <h2>Home</h2>
        {users ? (
          <div className="assign">
            <div className="card">
              <div>
                <input
                  type="text"
                  placeholder="User Id..."
                  onKeyUp={(e) => {
                    if (e.key === "Backspace") {
                      e.target.value = "";
                    }
                  }}
                  onChange={(e) => {
                    userFilterhandler(e.target.value);
                  }}
                />

                {userId ? (
                  <>
                    <p>
                      <strong>Name: </strong>
                      {userId.name}
                    </p>
                    <p>
                      <strong>Experience:</strong>{" "}
                      {userId.isSenior ? "Senior" : "junior"}
                    </p>
                    <p>
                      <strong>Department:</strong> {userId.department}
                    </p>
                    <p>
                      <strong>Salary:</strong> {userId.salary}$
                    </p>
                    <div>
                      <strong>Car:</strong>{" "}
                      {userId.isCar ? (
                        <div className="green sc">● Owned</div>
                      ) : (
                        <div className="red sc">● None</div>
                      )}
                    </div>
                  </>
                ) : (
                  " Waiting..."
                )}
              </div>
            </div>
          </div>
        ) : (
          "Loading..."
        )}
        <div className="card mid">
          <input type="button" value="Buy Mercedes" onClick={buymerc} />
          <input
            type="button"
            onClick={() => {
              if (userId && carId) {
                matchCarWithUser();
              }
            }}
            value="Match Car With User"
          />
          <input type="button" value="Buy Lamborghini" onClick={buylambo} />
        </div>
        {cars ? (
          <div className="assign">
            <div className="card">
              <div>
                <input
                  type="text"
                  placeholder="Car Id..."
                  onKeyUp={(e) => {
                    if (e.key === "Backspace") {
                      e.target.value = "";
                    }
                  }}
                  onChange={(e) => {
                    carFilterhandler(e.target.value);
                  }}
                />

                {carId ? (
                  <>
                    <p>
                      <strong>Brand:</strong> {carId.name}
                    </p>
                    <p>
                      <strong>Rank:</strong> {carId.isGold ? "Gold" : "Silver"}
                    </p>
                    <p>
                      <strong>Availability:</strong>{" "}
                      {carId.isAvailable ? (
                        <span className="green">● Available </span>
                      ) : (
                        <span className="red">● Unavailable</span>
                      )}
                    </p>
                    <p>
                      <strong>Owner:</strong>{" "}
                      {carId.userId > 0 ? carId.userId : "None"}
                    </p>
                  </>
                ) : (
                  " Waiting..."
                )}
              </div>
            </div>
          </div>
        ) : (
          "Loading..."
        )}{" "}
        <div className="card column">
          <p>Here You Can Buy Cars ,And You Can Match Cars To Users </p>
          <p>
            By Simply Entering The User's Id And Car's Id You Can Go Through
            Their Info And Match To Your Liking .
          </p>
          <p>
            {" "}
            NOTE: Even If A Car Is Not Available Or A User Already Owns A Car
            You Can Still Bypass That And Assign Them
          </p>{" "}
          <p> All Relevant Info Will Be Updated Accordingly .</p>
        </div>
      </div>
    </div>
  );
}

function About({ cars }) {
  return (
    <div className="home">
      <div className="inner-cars">
        <h2>Cars</h2>
        <div className="card-top">
          <p>
            <strong>Available Cars:</strong>{" "}
            {cars
              ? cars.filter((car) => car.isAvailable).length + "/" + cars.length
              : ""}
          </p>
        </div>
        {cars
          ? cars.map((car) => {
              return (
                <div className="card" key={car.id}>
                  <div>
                    <p>
                      <strong>Id:</strong> {car.id}
                    </p>
                    <p>
                      <strong>Brand:</strong> {car.name}
                    </p>
                    <p>
                      <strong>Rank:</strong> {car.isGold ? "Gold" : "Silver"}
                    </p>
                    <p>
                      <strong>Availability:</strong>{" "}
                      {car.isAvailable ? (
                        <span className="green">● Available </span>
                      ) : (
                        <span className="red">● Unavailable</span>
                      )}
                    </p>
                    <p>
                      <strong>Owner:</strong>{" "}
                      {car.userId !== 0 && car.userId !== "0"
                        ? car.userId
                        : "None"}
                    </p>
                  </div>
                  <div
                    style={{
                      backgroundImage: `url(${car.car})`,
                      height: "10vw",
                      minHeight: "80%",
                      minWidth: "30%",
                    }}
                  ></div>
                </div>
              );
            })
          : "Loading..."}
      </div>
    </div>
  );
}

function Users({ users }) {
  return (
    <div className="home">
      <div className="inner-users">
        <h2>Users</h2>
        {users
          ? users.map((user) => {
              return (
                <div className="card more" key={user.id}>
                  <div>
                    <p>
                      <strong>Id:</strong> {user.id}
                    </p>
                    <p>
                      <strong>Name:</strong> {user.name}
                    </p>
                    <p>
                      <strong>Experience:</strong>{" "}
                      {user.isSenior ? "Senior" : "junior"}
                    </p>
                    <p>
                      <strong>Department:</strong> {user.department}
                    </p>
                    <p>
                      <strong>Salary:</strong> {user.salary}$
                    </p>
                    <div>
                      <strong>Car:</strong>{" "}
                      {user.isCar ? (
                        <div className="green sc">● Owned</div>
                      ) : (
                        <div className="red sc">● None</div>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundImage: `url(${user.avatar})`,
                      maxWidth: "200px",
                    }}
                  ></div>
                </div>
              );
            })
          : "Loading..."}
      </div>
    </div>
  );
}
