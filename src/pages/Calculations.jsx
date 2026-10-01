import { useState } from "react";
import {
  Calculator,
  RotateCcw,
  CheckCircle,
} from "lucide-react";

import { incrementProgress } from "../utils/storage";

function Calculations() {
  const [calculationType, setCalculationType] =
    useState("dose");

  const [values, setValues] = useState({
    doseRequired: "",
    doseAvailable: "",
    volumeAvailable: "",
    amountRequired: "",
    amountAvailable: "",
    percentage: "",
    totalVolume: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));

    setResult(null);
  };

  const calculate = () => {
    let answer = null;
    let formula = "";

    if (calculationType === "dose") {
      const required = Number(
        values.doseRequired
      );

      const available = Number(
        values.doseAvailable
      );

      const volume = Number(
        values.volumeAvailable
      );

      if (
        required > 0 &&
        available > 0 &&
        volume > 0
      ) {
        answer =
          (required / available) *
          volume;

        formula = `(${required} ÷ ${available}) × ${volume}`;
      }
    }

    if (calculationType === "quantity") {
      const required = Number(
        values.amountRequired
      );

      const available = Number(
        values.amountAvailable
      );

      if (
        required > 0 &&
        available > 0
      ) {
        answer =
          required / available;

        formula = `${required} ÷ ${available}`;
      }
    }

    if (
      calculationType ===
      "percentage"
    ) {
      const percentage = Number(
        values.percentage
      );

      const total = Number(
        values.totalVolume
      );

      if (
        percentage > 0 &&
        total > 0
      ) {
        answer =
          (percentage / 100) *
          total;

        formula = `(${percentage} ÷ 100) × ${total}`;
      }
    }

    if (answer !== null) {
      setResult({
        answer,
        formula,
      });

      incrementProgress(
        "calculationsCompleted"
      );
    }
  };

  const reset = () => {
    setValues({
      doseRequired: "",
      doseAvailable: "",
      volumeAvailable: "",
      amountRequired: "",
      amountAvailable: "",
      percentage: "",
      totalVolume: "",
    });

    setResult(null);
  };

  const changeCalculationType = (
    event
  ) => {
    setCalculationType(
      event.target.value
    );

    setResult(null);
  };

  return (
    <div className="calculations-page">
      <section className="page-heading">
        <p className="eyebrow">
          PHARMACY MATH
        </p>

        <h2>
          Pharmacy Calculations
        </h2>

        <p>
          Practice common pharmacy
          calculation formulas.
        </p>
      </section>

      <div className="calculation-layout">
        {/* Calculator */}
        <section className="calculation-card">
          <div className="calculation-header">
            <div className="calculation-icon">
              <Calculator size={23} />
            </div>

            <div>
              <h3>
                Calculation Tool
              </h3>

              <p>
                Enter the values below
                to calculate.
              </p>
            </div>
          </div>

          <div className="calculation-type-label">
            Calculation type
          </div>

          <div className="calculation-type-grid">
            <button
              type="button"
              className={
                calculationType ===
                "dose"
                  ? "calculation-type active"
                  : "calculation-type"
              }
              onClick={() => {
                setCalculationType(
                  "dose"
                );
                setResult(null);
              }}
            >
              <span className="type-number">
                01
              </span>

              <span>
                <strong>
                  Dose
                </strong>

                <small>
                  Required dose
                </small>
              </span>
            </button>

            <button
              type="button"
              className={
                calculationType ===
                "quantity"
                  ? "calculation-type active"
                  : "calculation-type"
              }
              onClick={() => {
                setCalculationType(
                  "quantity"
                );
                setResult(null);
              }}
            >
              <span className="type-number">
                02
              </span>

              <span>
                <strong>
                  Quantity
                </strong>

                <small>
                  Amount per unit
                </small>
              </span>
            </button>

            <button
              type="button"
              className={
                calculationType ===
                "percentage"
                  ? "calculation-type active"
                  : "calculation-type"
              }
              onClick={() => {
                setCalculationType(
                  "percentage"
                );
                setResult(null);
              }}
            >
              <span className="type-number">
                03
              </span>

              <span>
                <strong>
                  Percentage
                </strong>

                <small>
                  Concentration
                </small>
              </span>
            </button>
          </div>

          <div className="calculation-fields">
            {calculationType ===
              "dose" && (
              <>
                <label>
                  <span>
                    Dose required
                  </span>

                  <input
                    type="number"
                    name="doseRequired"
                    value={
                      values.doseRequired
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="e.g. 250"
                  />
                </label>

                <label>
                  <span>
                    Dose available
                  </span>

                  <input
                    type="number"
                    name="doseAvailable"
                    value={
                      values.doseAvailable
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="e.g. 125"
                  />
                </label>

                <label>
                  <span>
                    Volume available
                  </span>

                  <input
                    type="number"
                    name="volumeAvailable"
                    value={
                      values.volumeAvailable
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="e.g. 5"
                  />
                </label>
              </>
            )}

            {calculationType ===
              "quantity" && (
              <>
                <label>
                  <span>
                    Amount required
                  </span>

                  <input
                    type="number"
                    name="amountRequired"
                    value={
                      values.amountRequired
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="e.g. 500"
                  />
                </label>

                <label>
                  <span>
                    Amount per unit
                  </span>

                  <input
                    type="number"
                    name="amountAvailable"
                    value={
                      values.amountAvailable
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="e.g. 250"
                  />
                </label>
              </>
            )}

            {calculationType ===
              "percentage" && (
              <>
                <label>
                  <span>
                    Percentage
                  </span>

                  <input
                    type="number"
                    name="percentage"
                    value={
                      values.percentage
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="e.g. 5"
                  />
                </label>

                <label>
                  <span>
                    Total volume
                  </span>

                  <input
                    type="number"
                    name="totalVolume"
                    value={
                      values.totalVolume
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="e.g. 200"
                  />
                </label>
              </>
            )}
          </div>

          <div className="calculation-actions">
            <button
              type="button"
              className="calculate-button"
              onClick={calculate}
            >
              <Calculator size={18} />
              Calculate
            </button>

            <button
              type="button"
              className="reset-button"
              onClick={reset}
            >
              <RotateCcw size={17} />
              Reset
            </button>
          </div>
        </section>

        {/* Result */}
        <section className="calculation-result">
          <div className="result-heading">
            <div>
              <p className="result-eyebrow">
                YOUR RESULT
              </p>

              <h3>
                Calculation Result
              </h3>
            </div>

            <div className="result-calculator-icon">
              <Calculator size={20} />
            </div>
          </div>

          {result ? (
            <div className="result-content">
              <div className="result-success">
                <CheckCircle size={18} />
                Calculation complete
              </div>

              <div className="result-value">
                {Number.isInteger(
                  result.answer
                )
                  ? result.answer
                  : result.answer.toFixed(
                      2
                    )}
              </div>

              <p className="result-label">
                Calculated value
              </p>

              <div className="formula-box">
                <span>
                  Formula used
                </span>

                <strong>
                  {result.formula}
                </strong>
              </div>
            </div>
          ) : (
            <div className="result-empty">
              <div className="result-empty-icon">
                <Calculator size={30} />
              </div>

              <h4>
                Ready to calculate
              </h4>

              <p>
                Enter your values and
                click Calculate to see
                your result here.
              </p>
            </div>
          )}
        </section>
      </div>

      <div className="calculation-note">
        <strong>
          Study note
        </strong>

        <p>
          This calculator is for
          educational practice. Always
          verify calculations using
          appropriate pharmacy procedures,
          references, and supervision in
          real practice.
        </p>
      </div>
    </div>
  );
}

export default Calculations;