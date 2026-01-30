;; Math helper utilities

;; Calculate percentage
(define-read-only (calculate-percentage (amount uint) (percentage uint))
    (/ (* amount percentage) u100))

;; Safe subtraction
(define-read-only (safe-sub (a uint) (b uint))
    (if (>= a b)
        (ok (- a b))
        (err u1)))