# Presenter notes - learn-classification-regression-with-phoebe

Instructor-only. Run-of-show per session (45 min), preflight, never-cut beats, cuts-if-long.
Student pages carry none of this. Numbers: materials/algo-canon.md is the only authority.

## Global preflight (every session)

- `learn-python` conda env active; `lumen_sessions.parquet` present (or run the c1 generator live).
- Browser on the session page via a local server, NOT file:// (the boundary explorer + quizzes).
- Projector zoom button top-right if the room is big; expand-all before scrolling on the projector.
- Have algo-canon.md open in a side tab - if a live run jitters in the 2nd decimal, say "library
  jitter, the relationship is the lesson" and move on. First-decimal drift = check seed/split.

## c1 The supervised zoo
- Run-of-show: 0-3 welcome + intro-ml contract / 3-11 zoo map SVG (two families) / 11-18 boundary
  concept + explorer play / 18-36 demo: regenerate data + 3-model loop / 36-42 read the leaderboard
  / 42-45 quiz + homework.
- Never cut: the k=1 memorization moment in the explorer (train ~100% test sinks) - it seeds the
  entire course's overfitting language.
- Cut if long: the parametric/non-parametric card can go self-study; the 40 GB fraud story survives
  as one sentence.
- Trap: someone will ask "which algorithm is best?" - the honest answer IS the course; log it on a
  whiteboard "parking lot" and revisit in c9.

## c2 Linear regression, properly
- 0-3 recap / 3-12 least squares + reading slope in dollars / 12-18 full model + design matrix /
  18-26 demo: 1-feature then full / 26-36 the explosion (80-buyer poly table) / 36-42 ridge-lasso
  tamer card / 42-45 wrap.
- Never cut: the deg-12 test R² of -798,595. Read the number out loud, slowly. It lands.
- Honesty beat (say it): intro-ml's b8 printed ~0.52/$28; the same code runs 0.59/$25 on the current
  stack - versions move, re-run your numbers. This models good practice, not an apology.
- Cut if long: multicollinearity card -> self-study.

## c3 Logistic regression, from the inside
- 0-3 / 3-10 sigmoid + boundary-is-a-line (explorer on Lumen: the calm straight seam) / 10-20 odds
  ladder + OR table / 20-26 why log-loss / 26-40 demo: fit C=1e6, read ORs against the generator's
  true machine / 40-45 wrap.
- Never cut: "the model found the machine that made the data" - exp(0.95)=2.6 vs fitted ~2.8,
  spend 0.006 recovered. This is the course's most magical validated moment.
- Precision drill: force the room to say "2.8x the ODDS", never "2.8x as likely". Correct it every
  time it slips; that correction is the session.
- Cut if long: solver card -> self-study (c4 revisits it anyway).

## c4 Gradient descent
- 0-3 / 3-11 loss surface + gradient plain-English / 11-18 learning-rate panels + scaling-rounds-
  the-bowl / 18-38 THE from-scratch lab (type it live, 15 lines) / 38-42 compare with sklearn
  (match to 2 decimals - the applause line) / 42-45 wrap.
- Never cut: typing the loop live. Do not paste it. The room needs to see it is only 15 lines.
- Have the lr=50 divergence ready as the pre-planned "crash" - loss to nan in a few steps, laugh,
  fix, move on. Failure staged is failure taught.
- Cut if long: batch-vs-SGD card -> one sentence + self-study.

## c5 k-nearest neighbors
- 0-3 / 3-10 the no-training idea + vote / 10-20 the k dial with explorer (k=1 -> 0.50!) / 20-27
  scaling proof (0.64 vs 0.58) / 27-40 demo: k sweep scaled + unscaled + kNN regression / 40-45 wrap.
- Never cut: k=1 AUC 0.504 - "a coin flip dressed as a model". And the scaled/unscaled pair - it is
  the single most quotable scaling proof in the course.
- Cut if long: brute/kd-tree/ball-tree card -> self-study; curse of dimensionality compresses to the
  one-hot-dimensions sentence.

## c6 Naive Bayes
- 0-3 / 3-12 Bayes flip + the naive bet / 12-20 variants table + smoothing / 20-36 demo: GaussianNB
  + BernoulliNB + the timing race / 36-42 the bad-estimator warning on the proba histogram / 42-45.
- Never cut: "wrong assumption, decent ranking, lying probabilities" - the whole session in one line.
- The timing race lands best as theater: count "one-one-thousand" during logistic's fit, then blink
  at NB's.
- Cut if long: Complement/Categorical variants -> one row each, self-study.

## c7 Decision trees, in depth
- 0-3 / 3-13 split mechanics + gini walk / 13-22 depth sweep + pruning (explorer: crank depth) /
  22-38 demo: sweep, prune, plot_tree, importances / 38-42 trees-lose-to-lines beat (0.54 vs 0.59)
  / 42-45 wrap.
- Never cut: depth-None train AUC 1.000 / test 0.509 next to each other; and session_hour at the
  bottom of feature importance (the planted noise pays off).
- Say gini-vs-entropy verdict exactly: near-identical results, gini is default because it is
  CHEAPER, not better.
- Cut if long: missing-value routing + instability cards -> self-study (keep the forest teaser line).

## c8 Support vector machines
- 0-3 / 3-12 widest street + support vectors / 12-22 kernels + gamma with explorer on moons /
  22-38 demo: LinearSVC ties logistic, default RBF loses / 38-42 the honesty reading ("kernels are
  a hypothesis about shape") / 42-45 wrap.
- Never cut: the moons-vs-Lumen contrast in the explorer - RBF wins the moons, loses Lumen. That
  contrast IS the no-free-lunch argument c9 formalizes.
- Watch the clock in Part 1: margin diagrams eat time. The street metaphor, one diagram, move.
- Cut if long: LinearSVC quirks card -> self-study.

## c9 Choosing your model
- 0-3 / 3-13 one-axis map (every knob = the complexity knob) / 13-22 decision guide table + start-
  simple doctrine / 22-38 demo: the GridSearchCV harness, CV means +/- spread / 38-42 the
  cliffhanger: NOBODY touches test today / 42-45 wrap + memo homework.
- Never cut: the fold spread as information (0.706 +/- 0.010) and the no-free-lunch confession that
  Lumen's generator is log-linear - the course's intellectual honesty peak.
- Collect (or have them commit to) the model-recommendation memo BEFORE c10. The public grading in
  c10 is the retention hook.

## c10 Capstone: the bake-off
- 0-3 / 3-10 rules + leakage checklist / 10-24 run both leaderboards / 24-36 model cards + dollars-
  before-scores drills / 36-42 grade the c9 memos + ship decision / 42-45 the four bridges + close.
- Never cut: reading the regression winner as "$25 average miss vs a $40 do-nothing baseline" and
  making three people rephrase their own row in dollars.
- Close warm: "you now speak algorithm - feature engineering and ensembles make you dangerous."
  Point at the hub for the siblings.
