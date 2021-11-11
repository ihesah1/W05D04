
//read File and put it inside global array
fs.readFile("./movies.json", getAllMovies());
  
  //write on file
  const addToFileFunction = (newMov) => {
    fs.writeFile("./movies.json", JSON.stringify(newMov), () => {
      //to json
    });
  };
  
  //get not deleted
  app.get("/get", (req, res) => {
    const notDeletedMov = [];  
    nweM.map((ele) => {
      if (ele.isDeleted === false) {
        notDeletedMov.push({ ele });
      }
    });
    res.json(notDeletedMov);
  });
  
  //get the fav
  app.get("/getFav", (req, res) => {
    const favMov = [];
    nweM.map((ele) => {
      if (ele.isFav === true) {
        favMov.push({ ele });
      }
    });
    res.json(favMov);
  });
  
  //get by id
  app.get("/get/:id", (req, res) => {
    const id = req.params.id;
    const Movie = nweM.find((ele) => ele.id === Number(id));
    res.json(Movie);
  });
  
  //create
  app.post("/create", (req, res) => {
    const { name } = req.body;
    nweM.push({
      id: nweM.length + 1,
      name: name,
      isFav: false,
      isDeleted: false,
    }); 
    addToFileFunction(nweM);
    res.json(nweM);
  });
  
  //update on fav (fav)
  app.put("/putFav/:id", (req, res) => {
    const idd = req.params.id;
    for (let i = 0; i < nweM.length; i++) {
      if (nweM[i].id === Number(idd)) {
        nweM[i].isFav = true;
      }
    }
    addToFileFunction(nweM);
    //   fs.writeFile("./movies.json", JSON.stringify(nweM), (err) => {}); 
    res.json(nweM);
  });
  
  //update on fav (unfav)
  app.put("/putUn/:id", (req, res) => {
    const idd = req.params.id;
    for (let i = 0; i < nweM.length; i++) {
      if (nweM[i].id === Number(idd)) {
        nweM[i].isFav = false;
      }
    }
    addToFileFunction(nweM);
    res.json(nweM);
  });
  
  ///////delete > soft delete mean update< 
  app.put("/delete/:id", (req, res) => {
    const iddd = req.params.id;
    for (let i = 0; i < nweM.length; i++) {
      if (nweM[i].id === Number(iddd)) {
        nweM[i].isDeleted = true;
      }
    } addToFileFunction(nweM);
    res.json(nweM);
  });