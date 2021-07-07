<p align="center">
<a href="https://dscvit.com">
	<img src="https://user-images.githubusercontent.com/30529572/72455010-fb38d400-37e7-11ea-9c1e-8cdeb5f5906e.png" />
</a>
	<h2 align="center"> HackJudge Portal Backend </h2>
	<h4 align="center"> Backend to help make judging easier. <h4>
</p>

---

[![DOCS](https://img.shields.io/badge/Documentation-see%20docs-green?style=flat-square&logo=appveyor)](https://documenter.getpostman.com/view/10709921/SzS2w82X?version=latest) 
  [![UI ](https://img.shields.io/badge/User%20Interface-Link%20to%20UI-orange?style=flat-square&logo=appveyor)](https://github.com/GDGVIT/HackJudge-Frontend)

## Functionality

- [x] Page to upload abstracts
- [x] Link to the project
- [x] Evaluation records of the teams + Review page + Details of teams
- [x] Excel migration + abstracting
- [ ] Integrating IBM watson to compare the abstracts related to the problem statements

## Instructions to run
- Pre-requisites: - Node.js + NPM
- Setting up the app

```bash
$ git clone https://github.com/GDGVIT/HackJudge-Backend
$ cd HackJudge-Backend
```

## Setting up the environment 
- Set the environment variable `MONGO_URL` to your mongodb instance 
- Set the environment variable `JWT_PASS` to a secure password, used to encrypt JWTs

## Running the app

```bash
$ npm install
$ npm start
```

# Contributors

* [ Pragati ](https://github.com/Pragati1610)
* [ Amogh ](https://github.com/ATechnoHazard)

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

<p align="center">
	Made with :heart: by <a href="https://dscvit.com">DSC VIT</a>
</p>
