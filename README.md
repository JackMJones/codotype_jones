# Codotype
<img width="150" height="150" src="https://raw.githubusercontent.com/codotype/codotype-branding/master/codotype-github.jpg" alt="Codotype Logo">

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fcodotype%2Fcodotype.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fcodotype%2Fcodotype?ref=badge_shield)
[![GitHub contributors](https://img.shields.io/github/contributors/codotype/codotype.svg)](https://github.com/codotype/codotype/graphs/contributors)
[![Build Status](https://travis-ci.org/codotype/codotype.svg?branch=master)](https://travis-ci.org/codotype/codotype)
[![GitHub issues](https://img.shields.io/github/issues/codotype/codotype.svg)](https://github.com/codotype/codotype/issues)
[![GitHub last commit](https://img.shields.io/github/last-commit/codotype/codotype.svg)](https://github.com/codotype/codotype/commits/master)

[![Gitter](https://img.shields.io/gitter/room/codotype/codotype)](https://gitter.im/codotype/Lobby)
[![Twitter](https://img.shields.io/twitter/follow/codotype.svg?style=social&label=Follow)](https://twitter.com/codotype)
![Star](https://img.shields.io/github/stars/codotype/codotype.svg?style=social&label=Star)

### Stay on the bleeding edge — [join our Gitter room!](https://gitter.im/codotype/Lobby) 🎉

### [Documentation](https://codotype.org)

---

## Setup

1. Run the following command to set up your local environment for development:

```
lerna bootstrap
```

2. Your environment should be ready for development - please consult the documentation in each repository for more detailed development instructions.


Environment Setup
```
npm install -g @vue/cli
npm install -g lerna
```

Codotype Environment Setup
```
git clone https://github.com/codotype/codotype.git
cd ./codotype
git checkout -b dev
git reset --hard origin/dev
lerna bootstrap
```

Codotype Generator Setup
```
cd ./packages/@codotype
git clone https://github.com/codotype/codotype-mevn-generator.git
cd ./codotype-mevn-generator
../cli/bin/codotype.js serve
```

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fcodotype%2Fcodotype.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fcodotype%2Fcodotype?ref=badge_large)

