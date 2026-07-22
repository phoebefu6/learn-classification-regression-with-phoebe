# Official source map - learn-classification-regression-with-phoebe

How the 10 builder sessions (c1-c10) cover the three anchor sources. Researched 2026-07-22:
StatQuest video index (statquest.org, authoritative order), scikit-learn stable user guide
(supervised learning modules 1.1 / 1.4 / 1.6 / 1.9 / 1.10), and Andrew Ng's Machine Learning
Specialization C1 "Supervised Machine Learning: Regression and Classification" + C2 "Advanced
Learning Algorithms" (live Coursera syllabi). The 80% bar applies: each session teaches ~80% of
its mapped sources' working content; videos, labs, certificates stay official.

Companion file: `algo-canon.md` - every teaching number, validated with real sklearn runs.

## Sources at a glance

| Source | What we take | What stays official |
|---|---|---|
| StatQuest (Josh Starmer) | The intuition style: odds/log-odds ladder, gini walk-through, margin story, GD step-by-step | The videos themselves - each session's "covered" rows name the exact episodes |
| scikit-learn user guide | API truth: parameters that matter, solver table, practical-use tips, complexity warnings | Full API reference, math formulations |
| Ng ML Spec C1 + C2W4 | The pedagogy spine: cost function -> GD -> scaling -> polynomial -> logistic -> regularization; C2W4 tree module | Graded labs, certificates, neural-net weeks (deferred to deep-learning course) |

## Per-session coverage

### c1 The supervised zoo
- Ng C1 W1: what supervised learning is (✓ recap only - intro-ml owns this), regression vs classification framing ✓
- sklearn guide: the supervised-learning module map (1.1/1.4/1.6/1.9/1.10) as the zoo map ✓
- Parametric vs non-parametric, model-vs-instance framing (sklearn 1.6 "non-generalizing" language) ✓
- Not covered by design: data loading/EDA depth (intro-ml b1), unsupervised (its own planned course)

### c2 Linear regression, properly
- StatQuest Linear Models Part 0 (least squares) ✓, Part 1 (R², fit quality) ✓, Part 1.5 (multiple regression) ✓, Part 3 design matrices ◐ (one-hot as "design matrix" card)
- Ng C1 W1 linear regression + cost function ✓, W2 multiple features ✓, polynomial regression ✓, feature engineering ◐ (teaser - own planned course)
- sklearn 1.1.1 OLS + multicollinearity warning ✓, 1.1.16 polynomial-via-pipeline ✓, 1.1.2 Ridge / 1.1.3 Lasso / 1.1.5 Elastic-Net ◐ (one accordion: penalties tame the explosion; alpha, sparsity, corners-vs-circle intuition per StatQuest Regularization Parts 1/2/2.5/3)
- Not covered by design: p-values/CIs for coefficients (statistics course owns inference; sklearn doesn't do them anyway - say so), Lowess/Loess

### c3 Logistic regression internals
- StatQuest Logistic Regression overview ✓, Details Part 1 coefficients ✓, Details Part 2 maximum likelihood ✓, Details Part 3 pseudo-R² ◐ (named, not derived)
- Prereq episodes Odds and Log(Odds), Odds Ratios ✓ (taught inline as the odds ladder)
- Ng C1 W3: sigmoid ✓, decision boundary ✓, logistic cost / why-not-MSE ✓
- sklearn 1.1.11: C = inverse regularization + regularized-by-default warning ✓, solver table ◐ (one card: lbfgs default, saga for l1/big data, liblinear quirk)
- Not covered by design: multinomial/softmax (mention), deviance residuals

### c4 Gradient descent
- StatQuest Gradient Descent ✓, Stochastic Gradient Descent ✓, The Chain Rule ◐ (one card, intuition only)
- Ng C1 W1: GD, implementing GD, learning rate ✓; W2: feature scaling for GD ✓, convergence check ✓, choosing learning rate ✓; the classic NumPy GD lab pattern ✓ (our from-scratch lab mirrors it on Lumen)
- sklearn: SGDClassifier as the scale-out option ◐, sag/saga need scaled features ✓ (ties to c3 solver card)
- Not covered by design: Adam/momentum (deep-learning course), backprop (ditto)

### c5 k-nearest neighbors
- StatQuest K-Nearest Neighbors ✓ (whole episode)
- sklearn 1.6: KNeighborsClassifier/Regressor ✓, choice-of-k guidance ✓, weights uniform/distance ✓, brute/kd_tree/ball_tree + auto rules ◐ (one card), curse of dimensionality ✓, tie-break warning ◐
- Scaling mandatory (validated 0.64 vs 0.58) ✓ - note: the sklearn neighbors page itself doesn't carry the scaling tip; we teach it anyway and say where it lives (preprocessing docs)
- Not covered by design: NCA, radius classifier depth, nearest-centroid

### c6 Naive Bayes
- StatQuest Naive Bayes (multinomial) ✓, Gaussian Naive Bayes ✓, Bayes' Theorem foundation ◐ (recap card linking learn-statistics)
- sklearn 1.9: GaussianNB ✓, MultinomialNB + alpha smoothing ✓, BernoulliNB ✓, ComplementNB ◐ (imbalanced-text tip), CategoricalNB ◐, "bad estimator - don't trust predict_proba" warning ✓, curse-of-dimensionality relief ✓, partial_fit/out-of-core ◐
- Not covered by design: text-classification pipeline end to end (spam demo stays conceptual - Lumen has no text)

### c7 Decision trees, in depth
- StatQuest Decision and Classification Trees ✓, Part 2 feature selection + missing data ◐, Regression Trees ✓, Cost Complexity Pruning ✓
- Ng C2 W4: learning process / choosing splits ✓, entropy + information gain ✓, one-hot for trees ✓, continuous features ✓, regression trees ✓, ensembles teaser ◐ (named as the ensembles course)
- sklearn 1.10: gini vs entropy/log_loss ✓, max_depth/min_samples_split/min_samples_leaf ✓ (leaf=5 starting tip ✓), ccp_alpha weakest-link pruning ✓, tips list (overfit w/ many features, visualize while training, depth doubling rule, balance the dataset) ✓, no-normalization-needed advantage ✓, instability + piecewise-constant + greedy disadvantages ✓, missing-value routing ◐
- Not covered by design: random forest / XGBoost mechanics (ensembles course - named), multi-output trees

### c8 Support vector machines
- StatQuest SVM Part 1 main ideas (margin, support vectors, soft margin) ✓, Part 2 polynomial kernel ✓, Part 3 RBF kernel ✓
- sklearn 1.4: SVC/LinearSVC/SVR roles ✓, C intuition ✓, gamma intuition ✓, kernel functions ✓, scaling-is-mandatory tip ✓, decrease-C-for-noisy-data tip ✓, class_weight for imbalance ◐, probability=True cost + Platt inconsistency warning ✓, O(n²)-O(n³) complexity + LinearSVC scaling ✓, exponential grid for C/gamma ✓
- Not covered by design: NuSVC/nu parameterization, custom/precomputed kernels, one-class SVM
- HONESTY BEAT: on Lumen, LinearSVC ties logistic (0.69) and default RBF loses (0.56) - kernels are not magic, tune or stay linear

### c9 Choosing your model
- Ng C2 W3: bias/variance diagnosis ✓, regularization vs bias/variance ✓, learning curves ◐, error analysis ◐; precision/recall recap ties intro-ml
- sklearn: model-choice heuristics distilled from all five module pages (when trees vs linear vs kNN vs NB vs SVM) ✓, GridSearchCV protocol (tune on CV never on test) ✓
- StatQuest bias-variance framing (Regularization Part 1's trade-off story) ✓
- Not covered by design: AutoML, ensembling as a fix (named for the ensembles course)

### c10 Capstone: the bake-off
- Synthesis session - no new source content. Both leaderboards run live; model cards written per algorithm; analyst-voice readout (dollars before scores, per intro-ml b8's reporting rule)
- Bridges named: learn-feature-engineering (better inputs), learn-ensemble-methods (better models), learn-model-evaluation (better judging), learn-experimentation (from predicting to causing)

## Honest not-covered list (course level)

- Neural networks (Ng C2 W1-W2) - learn-deep-learning-with-phoebe (planned)
- Ensembles beyond a teaser (Ng C2 W4 tail, StatQuest RF/XGBoost) - learn-ensemble-methods-with-phoebe (planned)
- Feature engineering depth - learn-feature-engineering-with-phoebe (planned)
- Statistical inference on coefficients (p-values, CIs) - learn-statistics-with-phoebe (live)
- The ML workflow itself (splits, CV mechanics, metric definitions) - learn-intro-ml-with-phoebe (live, assumed)
- Unsupervised learning - learn-unsupervised-with-phoebe (planned)

## From your subscriptions (finish-list)

- DeepLearning.AI: Machine Learning Specialization C1 (all 3 weeks) + C2 W3-W4 only - the direct anchor
- Coursera: same spec (cross-listed) - take there if certificates matter before consolidation
- 365 Data Science: Machine Learning in Python track (linear/logistic/kNN/NB/trees/SVM modules) - extract before cancel
- LinkedIn Learning: "Machine Learning with Scikit-Learn" (Frederick Nwanganga) - quick API second-pass
- Udemy: any owned "Machine Learning A-Z" - the SVM + kernel sections only; skip the rest (covered better above)

Fast-moving note: sklearn deprecations land regularly (SVC probability param deprecated 1.9,
gone 1.11 - pages teach decision_function instead). Re-verify against the current stable guide
before major re-deliveries.
