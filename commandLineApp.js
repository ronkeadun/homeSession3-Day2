var http = require('http');

var postId = process.argv[2];
postId = parseInt(postId);
console.log('=====================================');
if (typeof postId == 'number' && postId) {
    console.log('Fetching public post: ${postId} .... ');
} else {
    console.log('Invalid public postId, first public post will be fetched instead....');
    postId = 1;
}

var req = http.get('http://jsonplaceholder.typicode.com/posts/${postId}', (res) => {
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
        try {
            let parsedData = JSON.parse(rawData);
            console.log('=====================================');
            console.log(parsedData);
        } catch (e) {
            console.log('=====================================');
            console.log(e.message);
        }
    });
});

req.on('error', (e) => {
    console.log('=====================================');
    console.log('No post found for this id:${postId}');
});
req.end();