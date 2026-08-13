<!-- phoebe header -->

[![Open the live course](https://img.shields.io/badge/%E2%96%B6%20open%20the%20live%20course-1f6feb?style=for-the-badge)](https://phoebefu6.github.io/learn-classification-regression-with-phoebe/)
[![Star this repo](https://img.shields.io/github/stars/phoebefu6/learn-classification-regression-with-phoebe?style=for-the-badge&label=star%20this%20repo&color=444444)](https://github.com/phoebefu6/learn-classification-regression-with-phoebe/stargazers)
[![Free courses](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fphoebefu6.github.io%2Flearn-with-phoebe%2Fstats.json&query=%24.courses_live&label=free%20courses&style=for-the-badge&color=111111)](https://phoebefu6.github.io/learn-with-phoebe/)

### ▶︎ [Open the live course →](https://phoebefu6.github.io/learn-classification-regression-with-phoebe/)

Free, runs in your browser. No install, no login.

> 📚 Part of **[Learn with Phoebe](https://phoebefu6.github.io/learn-with-phoebe/)** - free, hands-on courses on AI, data, and the craft around them. **[Browse every course ↗](https://phoebefu6.github.io/learn-with-phoebe/)**

<!-- /phoebe header -->

# learn-classification-regression-with-phoebe

The supervised algorithm zoo, in depth - a free 10-session builder course by Phoebe Fu.

**Live site:** https://phoebefu6.github.io/learn-classification-regression-with-phoebe/

## What it is

The direct sequel to [learn-intro-ml-with-phoebe](https://phoebefu6.github.io/learn-intro-ml-with-phoebe/).
Intro-ML taught the workflow (splits, over/underfitting, CV, metrics, pipelines) with one classifier
and one tree; this course goes deep on the algorithms themselves:

1. **The supervised zoo** - the map, two families, decision boundaries live
2. **Linear regression, properly** - least squares, coefficients in dollars, the polynomial explosion
3. **Logistic regression, from the inside** - sigmoid, odds ratios, log-loss
4. **Gradient descent** - a 15-line from-scratch descent that matches scikit-learn
5. **k-nearest neighbors** - the k dial, mandatory scaling, the curse of dimensionality
6. **Naive Bayes** - the independence bet, the variants, why its probabilities lie
7. **Decision trees, in depth** - gini vs entropy, pruning, feature importance
8. **Support vector machines** - margins, C and gamma, the kernel trick, honestly tested
9. **Choosing your model** - bias-variance across the zoo, the fair-comparison protocol
10. **Capstone: the bake-off** - both leaderboards, model cards, analyst-grade readout

Everything runs on **Lumen Skincare** (synthetic DTC brand, generator seed 42) - the same dataset as
the statistics, intro-ML, and experimentation courses, so every number reconciles across the ladder.
Every teaching number was validated with a real scikit-learn run (see `materials/algo-canon.md`).

## The live layer

`assets/algo-live.js` - an in-browser decision-boundary explorer: real logistic regression (gradient
descent), real CART (gini), brute-force kNN, and RBF kernel logistic regression, fit live on a 300-point
Lumen sample or a stylized two-moons set, with a train-vs-test accuracy readout.

## Format

Static HTML/CSS/JS, no build step. 45-minute sessions: concepts as Live/Self-study cards, a build-along
demo on the running case, homework, a 3-question quiz, honest source-coverage rows, and a cheat sheet.
Sources distilled: StatQuest algorithm series, the scikit-learn user guide (modules 1.1 / 1.4 / 1.6 /
1.9 / 1.10), and Andrew Ng's ML Specialization (C1 + the C2 tree module). Certificates, videos, and
graded labs stay with the official providers.

by Phoebe Fu
