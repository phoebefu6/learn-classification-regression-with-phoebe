# Algorithm canon - learn-classification-regression-with-phoebe

Every number on every page comes from THIS file. All values verified 2026-07-22 with real
sklearn fits in the `learn-python` conda env (numpy 2.3.5, sklearn 1.9.0, pandas 2.3.3) on the
Lumen Skincare generator copied VERBATIM from
`learn-intro-ml-with-phoebe/materials/lumen-canon.md` (seed 42, N=40,000). Teach "~" values and
RELATIONSHIPS, never a false 4th decimal.

## Position in the ds ladder

`learn-statistics` (the math) -> `learn-intro-ml` (the workflow) -> **THIS COURSE (the algorithms)**
-> feature-engineering / model-evaluation / ensembles (planned d3 siblings).

intro-ml taught the workflow (split, over/underfitting, CV, metrics, pipelines) using ONLY
logistic regression + one decision tree, and explicitly deferred the zoo. This course opens the
zoo: linear/polynomial regression, logistic internals, gradient descent, kNN, naive Bayes,
decision trees in depth, SVM - then how to choose. It ASSUMES intro-ml b1-b10 (never re-teach
split discipline or metric definitions; recap in one card, link the sibling).

## The dataset fingerprint (current env - state these)

- 40,000 rows, conversion rate **~3.3%** (0.0326), AOV mean **$73**, median **$67**, SD **$38**
- corr(prior_30d_spend, order_value) = **0.60**; returning share 35%
- Converters (regression subset): **n=1,306**, mean **$82**, SD **$41**
- NOTE vs intro-ml docs: lumen-canon.md says conversion 3.15%; the generator produces 3.26% in
  the current env (numpy stream drift). Teaching value everywhere: "~3%" / "roughly 1 in 30".
  A fix task for intro-ml has been flagged; do not copy 3.15% into new pages.

## Conventions (match intro-ml exactly)

- Split: `train_test_split(X, y, test_size=0.25, random_state=42, stratify=y)` (no stratify on
  the buyers regression split - matches b8).
- Cats: `pd.get_dummies(..., drop_first=True)` for interpretability sessions; sklearn
  `OneHotEncoder(handle_unknown="ignore")` inside pipelines.
- Feature sets: **numeric-only** = spend, pages, hour (b3's first model). **Full** = numeric +
  channel, device, new_vs_returning, product_category. **b8-regression** = spend, category,
  channel, returning on buyers only.

## CLASSIFICATION - predict `converted` (30k train / 10k test)

| Model | Test ROC-AUC | Teach as | Session |
|---|---|---|---|
| Always-no baseline | 0.5 (acc ~96.7%) | the accuracy paradox (recap from intro-ml) | c1 |
| Logistic, numeric-only (b3 replica) | **0.61** | the honest first model | c3 |
| Logistic, full features | **0.69** (single split) / **0.71 +/- 0.01** (5-fold CV, folds 0.688-0.715) | the number that reconciles with intro-ml's "~0.71" | c3, c9, c10 |
| LinearSVC, full, scaled | **0.69** | ties logistic - same linear boundary family | c8 |
| Decision tree depth 5 (gini) | **0.66** | best tree; gini vs entropy near-identical (0.660 vs 0.653) | c7 |
| GaussianNB, full | **0.66** | the 1-millisecond baseline | c6 |
| BernoulliNB, cats only | **0.65** | NB on one-hots | c6 |
| kNN k=101, full, SCALED | **0.64** | kNN's ceiling here | c5 |
| kNN k=101, full, UNSCALED | **0.58** | scaling is mandatory for distance models | c5 |
| kNN k=1 | **0.50** | memorization = coin flip on new data | c5 |
| SVC rbf default (6k subsample) | **0.55-0.56** | kernels are not magic; defaults can lose to linear | c8 |
| Tree depth None | train 1.00 / test **0.51** | pure memorization | c7 |

Tree depth sweep (classification, full features): depth 2 -> test 0.632, depth 5 -> **0.660**
(peak), depth 8 -> 0.650, depth None -> 0.509 (train 1.000). ccp_alpha=1e-4 with no depth cap
-> 0.635. The U-curve again, now in AUC.

kNN k sweep (full, scaled): k=1 -> 0.504, k=5 -> 0.533, k=25 -> 0.592, k=101 -> **0.640**.
On imbalanced data big k smooths; k=1 memorizes.

### Logistic internals (c3/c4 - unscaled fit, drop_first, near-unregularized C=1e6)

Odds ratios to teach (round to 1dp): **email OR ~4.1**, direct ~3.2, **returning OR ~2.8**,
sms ~2.7 (vs affiliate reference); pages_viewed OR ~1.13 per page; prior_30d_spend coef +0.006
-> OR 1.01 per $1 = **~1.8 per $100** (exp(0.6)); session_hour coef ~0.00 (the planted noise
feature). Intercept ~ -5.9. These recover the generator's true z (built with +0.95 returning,
+0.006 spend, +0.11 pages) - say so: "the model found the machine that made the data".

### Gradient descent (c4 - from-scratch lab, VERIFIED)

Batch GD on 2 scaled features (spend, pages), lr=0.5, 400 iters:
w = [0.313, 0.238], b = -3.461 vs sklearn (C=1e6): [0.315, 0.240], -3.465. **Match to ~2
decimals** - the lab's payoff line: "your 15-line loop just reproduced sklearn".

## REGRESSION - predict `order_value` on buyers (n=1,306; 979 train / 327 test)

| Model | Test R2 | RMSE | Teach as | Session |
|---|---|---|---|---|
| Predict-the-mean baseline | 0.00 | **$40** | the floor (intro-ml recap) | c1, c2 |
| 1-feature linear (spend) | **0.43** | **$30** | slope 0.44 = "44 cents of order per prior-spend dollar", intercept ~$42 | c2 |
| Full linear (b8's 4 features) | **0.59** | **$25** (MAE $20) | the workhorse; NOTE: b8 page says ~0.52/$28 - does not reproduce today, fix flagged; teach 0.59/$25 | c2, c10 |
| Poly degree 2-3 (spend) | 0.43 | - | adds nothing when the truth is linear | c2 |
| Tree regressor depth 4 (4 feats) | **0.54** | - | peak tree; loses to linear 0.59 - "trees lose when the truth is linear" | c7 |
| kNN regressor k=25, scaled | **0.46** | - | kNN does regression too | c5 |
| Tree depth None | **-0.08** (train 1.00) | - | memorization goes NEGATIVE | c7 |

kNN-reg k sweep: k=1 -> **-0.10**, k=5 -> 0.40, k=25 -> **0.46**, k=101 -> 0.39 (over-smoothed).

### The polynomial explosion (c2 centrepiece - VERIFIED, spectacular)

80 buyers subsampled (rng seed 0), 50 train / 30 test, poly on scaled spend:

| degree | Train R2 | Test R2 |
|---|---|---|
| 1 | 0.37 | 0.43 |
| 2 | 0.37 | 0.43 |
| 3 | 0.37 | 0.34 |
| 6 | 0.43 | **-26.7** |
| 12 | 0.47 | **-798,595** |

Teach: a degree-12 polynomial through 50 points swings wildly between them and EXPLODES at the
edges - test error is not just "worse", it is six orders of magnitude worse than predicting the
mean. Flexibility without restraint is a liability. (Full-data poly is boring by design: deg 2-8
all ~0.43 because the truth IS linear - show both, that contrast is the lesson.)

Tree-reg depth sweep (4 feats): d3 0.53, **d4 0.54** (peak), d6 0.36, d10 0.12, None -0.08.

## The capstone leaderboards (c10 - both tasks, one table each)

Classification (full features, AUC): logistic **0.69** ~ LinearSVC **0.69** > tree(d5) **0.66**
~ GaussianNB **0.66** > kNN(k=101) **0.64** > SVC-rbf-default **0.56**.
Regression (R2): linear **0.59** > tree(d4) **0.54** > kNN(k=25) **0.46** > baseline 0.
The punchline is HONEST: on this tabular, mostly-linear problem the linear models win, the fancy
ones do not - "match the model to the data's shape, not to the hype".

## Boundary-explorer datasets (algo-live.js - 2 modes)

1. **Lumen real** (honest mode): balanced 2,612-pt sample (all 1,306 converters + 1,306 random
   non, seed 42), features spend x pages, standardized. Test acc: logistic 0.59, kNN k=75 0.59,
   kNN k=1 0.52 (train 0.99!), tree d=4 0.56. Messy cloud, weak boundary - "real data whispers".
2. **Lumen lab** (geometry mode): stylized two-moons-style 2D set for SHAPE intuition - linear
   cuts straight, kNN goes local, tree cuts axis-parallel rectangles, RBF bends. Label it
   clearly as a stylized sandbox, not Lumen data.

## HARD accuracy notes (do not get these wrong)

- Odds ratio != probability ratio. OR 2.8 for returning does NOT mean "2.8x more likely" in
  probability terms at all base rates; at a 3% base rate it is close, say "odds" precisely.
- Logistic loss: teach log-loss / maximum likelihood, NOT "MSE on sigmoid" (non-convex trap).
- kNN and SVM REQUIRE feature scaling (validated: 0.64 vs 0.58 AUC). Trees and NB do not.
- Gini vs entropy: near-identical results (0.660 vs 0.653 here); gini is the default because
  it is cheaper, not better. Never teach entropy as "more accurate".
- Naive Bayes' independence assumption is FALSE here (channel correlates with returning) and it
  still lands 0.66 - the point: wrong assumptions can still rank well, but the probabilities
  are poorly calibrated. Do not read NB's predict_proba as real probabilities.
- SVM: the kernel trick computes dot products in the lifted space, it never builds the lifted
  features. C large = narrow margin (overfit risk), gamma large = wiggly boundary (overfit).
- SVC on 30k rows is SLOW (O(n^2)-ish) - the pages subsample 6k for RBF and say why; LinearSVC
  scales fine.
- Polynomial regression is STILL linear regression (linear in the weights) - the features bend,
  the model does not.
- No free lunch: the leaderboard here favors linear because the generator IS log-linear /
  linear. Say this out loud - on interaction-heavy data trees would win (that story belongs to
  the ensembles course).
- Never tune on test. Depth/k/C/gamma picks in c9 use 5-fold CV on train; the test set is spent
  once, in c10.

## Voice + guardrails

Builder-only track, 10 sessions (c1-c10), everyone starts at c1. Python + scikit-learn.
Hyphens only, never em/en dash. "by Phoebe Fu". Warm, plain-English, fun-not-dry. Defer to
siblings: feature engineering depth, ensembles/boosting, unsupervised, deep learning - name
them as "next", never teach them.
