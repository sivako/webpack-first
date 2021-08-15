import React, { useEffect, useState } from "react";
import Layout from "./Layout.react";
import Welcome from "./Welcome.react";
import Score from "./Score.react";

const randomOrder = (arr) => {
  const myRandom = () => Math.floor((Math.random() * 100) % arr.length);
  const output = [];
  arr.forEach((x) => {
    let index = myRandom();
    while (output.includes(arr[index])) {
      index = myRandom();
    }
    output.push(arr[index]);
  });
  return output;
};

const randomIndexesExcept = (elem_count, req_count, skip_index = -1) => {
  const output = [];
  if (elem_count < 1) {
    return output;
  }
  const arr = new Array(elem_count).fill(0).map((_, i) => i);
  const myRandom = () => Math.floor((Math.random() * 100) % arr.length);
  while (output.length < req_count) {
    const index = myRandom();
    if (index !== skip_index) {
      output.push(index);
    }
  }
  return output;
};

const BreedList = ({}) => {
  const [page, setPage] = useState("welcome");
  const [data, setData] = useState({});
  const [url, setUrl] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [activeBreed, setActiveBreed] = useState("");
  const [error, setError] = useState("");

  const fetchQuestions = () => {
    setQuestionIndex(0);
    const fetchDataWithCancel = (url, params) => {
      const controller = new AbortController();
      const { signal } = controller;

      const fetchParams = {
        ...params,
        signal,
      };

      const promise = fetch(url, fetchParams).then((data) => data.json());

      return [promise, controller.abort.bind(controller)];
    };
    const [fetch_promise, abort] = fetchDataWithCancel(
      "https://dog.ceo/api/breeds/list/all",
      {
        headers: {
          accept: "application/json, text/javascript, */*; q=0.01",
          "accept-language":
            "en-IN,en;q=0.9,te-IN;q=0.8,te;q=0.7,en-GB;q=0.6,en-US;q=0.5",
        },
        method: "GET",
      }
    );
    setTimeout(() => {
      abort();
    }, 2000);
    fetch_promise
      .then((res) => setData(res.message))
      .catch((err) => setError("Data not available. Try again."));
  };

  useEffect(() => {
    const breeds_arr = Object.keys(data);
    const ques = [];
    const que_indexes = randomIndexesExcept(breeds_arr.length, 10);
    que_indexes.forEach((index) => {
      const ans_indexes = randomIndexesExcept(breeds_arr.length, 3, index);
      ans_indexes.push(index);
      const answer = breeds_arr[index];
      const ans_options = randomOrder(ans_indexes.map((i) => breeds_arr[i]));
      ques.push({
        answer,
        ans_options,
        url: "",
        selected: -1,
      });
    });
    setQuestions(ques);
    if (ques?.length > 0) {
      setUrlForBreedName(ques[questionIndex].answer);
    }
    console.log("Questions created: ", ques);
  }, [data]);

  const setUrlForBreedName = (item) => {
    setUrl("");
    const fetchData = (item) => {
      fetch(`https://dog.ceo/api/breed/${item}/images/random`, {
        headers: {
          accept: "application/json, text/javascript, */*; q=0.01",
          "accept-language":
            "en-IN,en;q=0.9,te-IN;q=0.8,te;q=0.7,en-GB;q=0.6,en-US;q=0.5",
        },
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          setUrl(res.message);
        });
    };
    fetchData(item);
  };

  const onNext = () => {
    setQuestionIndex(questionIndex + 1);
    setUrlForBreedName(questions[questionIndex + 1].answer);
  };

  const onSelectAnswer = (index) => {
    const updated_questions = [...questions];
    updated_questions[questionIndex]["selected"] = index;
    updated_questions[questionIndex]["url"] = url;
    setQuestions(updated_questions);

    if (questionIndex === 9) {
      setPage("score");
    } else {
      onNext();
    }
  };

  // if (page === "question" && (!questions || questions.length === 0)) {
  //   return <div> Loading questions... </div>;
  // }

  const pages = {
    question: (
      <Layout
        {...{
          index: questionIndex,
          url,
          questions,
          onNext,
          onSelectAnswer,
          goHome: () => setPage("welcome"),
        }}
      />
    ),
    welcome: (
      <Welcome
        startNewQuiz={() => {
          fetchQuestions();
          setPage("question");
        }}
      />
    ),
    score: <Score {...{ questions, goHome: () => setPage("welcome") }} />,
  };

  if (error) {
    return <div>{error}</div>;
  }

  return pages[page];

  // return (
  //   <div style={{ margin: "0 30%" }}>
  //     <h2> {`Dog breeds! ${activeBreed}`} </h2>
  //     <div
  //       style={{
  //         display: "grid",
  //         gridTemplateColumns: "repeat(2, 1fr)",
  //         gridGap: "10px",
  //       }}
  //     >
  //       <div style={{ gridColumn: "1/2", gridRow: "1/2" }}>one</div>
  //       <div style={{ gridColumn: "2/3", gridRow: "1/2" }}>two</div>
  //       <div style={{ gridColumn: "1/2", gridRow: "2/3" }}>three</div>
  //       <div style={{ gridColumn: "2/3", gridRow: "2/3" }}>four</div>
  //     </div>
  //     <img style={{ width: "400px", height: "400px" }} src={url} />
  //     <div style={{ maxHeight: "700px", overflow: "scroll" }}>
  //       {Object.entries(data).map(([breed, sub]) => (
  //         <div
  //           key={breed}
  //           style={{
  //             cursor: "pointer",
  //             fontSize: "22px",
  //             padding: "8px",
  //             fontWeight: "bold",
  //           }}
  //           onClick={() => onSelectItem(breed)}
  //         >{`${breed} ${sub.length ? sub.length : ""}`}</div>
  //       ))}
  //     </div>
  //   </div>
  // );
};

export default BreedList;
