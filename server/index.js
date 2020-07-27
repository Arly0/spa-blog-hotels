const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());

app.get('/api/v1/posts', (req, res) => {
  let posts = [];
  for (let j = 0; j < 10; j++) {
    var consonants = 'bcdfghjlmnpqrstv',
          vowels = 'aeiou',
          length = 10,
          rand = function(limit) {
              return Math.floor(Math.random()*limit);
          },
          i, word=''; length = parseInt(length,10);
          consonants = consonants.split('');
          vowels = vowels.split('');
            for (i=0;i<length/2;i++) {
                var randConsonant = consonants[rand(consonants.length)],
                    randVowel = vowels[rand(vowels.length)];
                word += (i===0) ? randConsonant.toUpperCase() : randConsonant;
                word += i*2<length-1 ? randVowel : '';
            }
    posts.push({
      id: j,
      title: word,
      text: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
      picture: 'hotel_1.jpg',
      price: 100.00 * (j+1),
      raiting: parseInt(j / 2)
    });
  }

  res.status(200).send({
    posts: posts
  });
});

app.listen(PORT, () => {
  console.log(`Server start on port: ${PORT}`);
});