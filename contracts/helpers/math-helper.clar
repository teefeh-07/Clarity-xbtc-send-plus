;; Math helper utilities

;; Calculate percentage
(define-read-only (calculate-percentage (amount uint) (percentage uint))
    (/ (* amount percentage) u100))