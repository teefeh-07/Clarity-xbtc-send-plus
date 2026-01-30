;; Transfer logging contract

;; Log entry structure
(define-map transfer-logs
    { id: uint }
    {
        sender: principal,
        recipient: principal,
        amount: uint,
        timestamp: uint
    })

(define-data-var log-counter uint u0)