const express = rewquire('express');
const router = express.router();

router.get('/hello/world', function(req, res) {
    res.cookie('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World');
});

module.exports = router;
