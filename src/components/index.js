import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Index = () => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState()
  const [error, setError] = useState()
  const [foodInfo, setFoodInfo] = useState()
  const [nutritionInfo, setNutritionInfo] = useState([])

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    const objectUrl = URL.createObjectURL(e.target.files[0])
    setPreview(objectUrl)
  };
  const navigate = useNavigate();
  const handleSumbit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    // formData.append("fileName", fileName);
    try {
      axios
        .post("http://127.0.0.1:8000/uploadfile/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(({ data }) => {
          setFoodInfo(data)
          console.log(data);
          // navigate("/items");
          axios
            .get("https://api.nal.usda.gov/fdc/v1/foods/search", {
              params: {
                'query': data.Prediction,
                'pageSize': 1,
                'api_key': '6nFxfZFrywoqJ4PanhdbBVlWEUyIY6K6ejMJDYed'
              }
            }).then(({ data }) => {
              setNutritionInfo(data.foods[0].foodNutrients);
              console.log(nutritionInfo);

            })
            .catch(error => {
              setError("Could not process image!!. Please try again later.")
            });
            });
        } catch (ex) {
          alert("Error!!.Please try again later.")
        }
    };
    return (
      <div>
        <div
          className="register"
          style={{ justifyContent: "center", display: "grid", fontSize: "xx-large" }}
        >
          <form onSubmit={(event) => handleSumbit(event)}>
            <h3>Get Feedback About Your Food</h3>
            <div className="form-group">
              <label htmlFor="image">Food Image: </label> <br></br>
              <input
                type="file"
                className="form-control"
                accept="image/png, image/jpeg"
                onChange={saveFile}
              />
              {file && <img src={preview} width={400} height={400} />}
            </div>
            <br></br>
            {error && !foodInfo && <label style={{ color: "red" }}>{error} &#128547;</label>}  <br></br>
            <input type="submit" className="btn btn-primary" value="Process Image" />
          </form>
          {foodInfo && <label style={{ color: "green" }}>Looks like someone in going to eat {foodInfo.Prediction} today 😋</label>} <br></br>
          {
            foodInfo && <div style={{ textAlign: "left" }}>
              <br></br>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Protien</th>
                    <th scope="col">Carbs</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Pizza</td>
                    <td>15%</td>
                    <td>15%</td>
                    <td>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>
    );
  };
  export default Index;
