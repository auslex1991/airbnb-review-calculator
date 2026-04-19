'use client'

import { useState, useCallback } from 'react'

// ─── Core calculation logic ───────────────────────────────────────────────────
//
// Given: currentReviews (n), currentAvg (a), targetAvg (t)
// We iterate from x=1 upward and find the first x where:
//   round((n * a + 5 * x) / (n + x), 2) >= t
//
// Using a loop (rather than a closed-form formula) avoids floating-point
// precision issues that arise when the inputs themselves are rounded values.
//
function calcReviewsNeeded(currentReviews, currentAvg, targetAvg) {
  const currentTotal = currentReviews * currentAvg
  const MAX = 100_000

  for (let x = 1; x <= MAX; x++) {
    const newAvg = (currentTotal + 5 * x) / (currentReviews + x)
    const displayed = Math.round(newAvg * 100) / 100
    if (displayed >= targetAvg) return x
  }
  return null // effectively impossible within 100k reviews
}

// ─── Star display helper ──────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <span className="inline-flex gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.min(1, Math.max(0, rating - (i - 1)))
        return (
          <span key={i} className="relative inline-block text-2xl">
            <span className="text-airbnb-border">★</span>
            <span
              className="absolute inset-0 overflow-hidden text-airbnb-red"
              style={{ width: `${fill * 100}%` }}
            >
              ★
            </span>
          </span>
        )
      })}
    </span>
  )
}

// ─── Input field with label ───────────────────────────────────────────────────
function Field({ label, hint, id, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-airbnb-dark">
        {label}
      </label>
      {hint && <p className="text-xs text-airbnb-gray">{hint}</p>}
      <input id={id} className="input-field" {...props} />
    </div>
  )
}

// ─── Main Calculator ──────────────────────────────────────────────────────────
export default function Calculator() {
  const [form, setForm] = useState({
    currentReviews: '',
    currentAvg: '',
    targetAvg: '',
  })
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setResult(null)
    setError('')
  }, [])

  const handleCalculate = useCallback(
    (e) => {
      e.preventDefault()
      setError('')
      setResult(null)

      const n = parseInt(form.currentReviews, 10)
      const a = parseFloat(form.currentAvg)
      const t = parseFloat(form.targetAvg)

      // Validation
      if (!Number.isFinite(n) || !Number.isFinite(a) || !Number.isFinite(t)) {
        setError('Please fill in all fields with valid numbers.')
        return
      }
      if (n < 1) {
        setError('Current number of reviews must be at least 1.')
        return
      }
      if (a < 1 || a > 5) {
        setError('Current average must be between 1.00 and 5.00.')
        return
      }
      if (t < 1 || t > 5) {
        setError('Target average must be between 1.00 and 5.00.')
        return
      }
      if (t <= a) {
        setError('Target average must be higher than your current average.')
        return
      }
      if (t >= 5.0 && a < 5.0) {
        // Still let it calculate — it will just be a very large number
      }

      const needed = calcReviewsNeeded(n, a, t)
      setResult({ needed, n, a, t })
    },
    [form]
  )

  const newAvgAfter =
    result && result.needed
      ? Math.round(
          ((result.n * result.a + 5 * result.needed) /
            (result.n + result.needed)) *
            100
        ) / 100
      : null

  return (
    <div className="w-full max-w-lg mx-auto">
      <form onSubmit={handleCalculate} noValidate>
        <div className="bg-white border border-airbnb-border rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="px-6 pt-6 pb-4 border-b border-airbnb-border">
            <h2 className="text-lg font-semibold text-airbnb-dark">
              Enter your listing details
            </h2>
            <p className="text-sm text-airbnb-gray mt-1">
              Find the numbers on your Airbnb host dashboard.
            </p>
          </div>

          {/* Fields */}
          <div className="px-6 py-5 flex flex-col gap-4">
            <Field
              id="currentReviews"
              label="Total number of reviews"
              hint="e.g. 47 — the total count shown on your listing"
              name="currentReviews"
              type="number"
              min="1"
              step="1"
              placeholder="e.g. 47"
              value={form.currentReviews}
              onChange={handleChange}
              required
            />
            <Field
              id="currentAvg"
              label="Current average rating"
              hint="e.g. 4.90 — shown as a number on your listing page"
              name="currentAvg"
              type="number"
              min="1"
              max="5"
              step="0.01"
              placeholder="e.g. 4.90"
              value={form.currentAvg}
              onChange={handleChange}
              required
            />
            <Field
              id="targetAvg"
              label="Target average rating"
              hint="e.g. 4.91 — the score you want to reach"
              name="targetAvg"
              type="number"
              min="1"
              max="5"
              step="0.01"
              placeholder="e.g. 4.91"
              value={form.targetAvg}
              onChange={handleChange}
              required
            />

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="text-sm text-[#C13515] bg-[#FFF1EE] border border-[#FFCDC5] rounded-xl px-4 py-3"
              >
                {error}
              </div>
            )}
          </div>

          {/* Button */}
          <div className="px-6 pb-6">
            <button type="submit" className="btn-primary">
              Calculate
            </button>
          </div>
        </div>
      </form>

      {/* Result */}
      {result && (
        <div className="mt-6 flex flex-col gap-4 animate-in fade-in duration-300">
          {result.needed === null ? (
            <div className="result-card">
              <p className="text-2xl font-bold">Practically impossible</p>
              <p className="text-white/80 text-sm mt-2">
                Even with 100,000 additional 5-star reviews, this target
                couldn't be reached. Consider a more incremental goal.
              </p>
            </div>
          ) : (
            <>
              <div className="result-card">
                <p className="text-sm font-medium text-white/80 uppercase tracking-wider mb-1">
                  5-star reviews needed
                </p>
                <p className="text-6xl font-bold tabular-nums">
                  {result.needed.toLocaleString()}
                </p>
                <p className="text-white/80 text-sm mt-3">
                  to go from{' '}
                  <span className="font-semibold text-white">
                    ★ {result.a.toFixed(2)}
                  </span>{' '}
                  to{' '}
                  <span className="font-semibold text-white">
                    ★ {result.t.toFixed(2)}
                  </span>
                </p>
              </div>

              {/* Breakdown */}
              <div className="info-card">
                <h3 className="text-sm font-semibold text-airbnb-dark mb-3">
                  How it works
                </h3>
                <div className="space-y-2 text-sm text-airbnb-gray">
                  <div className="flex justify-between">
                    <span>Current reviews</span>
                    <span className="font-semibold text-airbnb-dark">
                      {result.n.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>5-star reviews to add</span>
                    <span className="font-semibold text-airbnb-red">
                      +{result.needed.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total reviews after</span>
                    <span className="font-semibold text-airbnb-dark">
                      {(result.n + result.needed).toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t border-airbnb-border pt-2 mt-2 flex justify-between">
                    <span>New average</span>
                    <span className="font-semibold text-airbnb-dark">
                      ★ {newAvgAfter?.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  <Stars rating={newAvgAfter ?? result.t} />
                </div>
              </div>

              {/* Tip */}
              <div className="text-xs text-airbnb-gray text-center px-2">
                Tip: The best way to earn 5-star reviews is to communicate
                proactively, keep your listing spotless, and exceed guest
                expectations on check-in.
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
