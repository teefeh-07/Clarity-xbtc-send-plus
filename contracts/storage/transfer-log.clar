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

;; Add log entry
(define-public (add-log (recipient principal) (amount uint))
    (let ((id (var-get log-counter)))
        (map-set transfer-logs
            { id: id }
            {
                sender: tx-sender,
                recipient: recipient,
                amount: amount,
                timestamp: stacks-block-height
            })
        (var-set log-counter (+ id u1))
        (ok id)))

;; Get log entry
(define-read-only (get-log (id uint))
    (map-get? transfer-logs { id: id }))

;; Get total logs
(define-read-only (get-log-count)
    (ok (var-get log-counter)))