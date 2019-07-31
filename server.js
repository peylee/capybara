#! /usr/bin/env node

var fs = require('fs'),
    path = require('path'),
    Twit = require('twit'),
    TwitterBot = require('node-twitterbot').TwitterBot,
    config = require(path.join(__dirname, 'config.js'));
    https = require('https');

function getImage(url, callback) {
    https.get(url, res => {
        // Initialise an array
        const bufs = [];

        // Add the data to the buffer collection
        res.on('data', function (chunk) {
            bufs.push(chunk)
        });

        // This signifies the end of a request
        res.on('end', function () {
            // We can join all of the 'chunks' of the image together
            const data = Buffer.concat(bufs);

            // Then we can call our callback.
            return callback(null, data.toString('base64'));
        });
    })
    // Inform the callback of the error.
    .on('error', callback);
}

/*var T = new TwitterBot({
 consumer_key: process.env.BOT_CONSUMER_KEY,
 consumer_secret: process.env.BOT_CONSUMER_SECRET,
 access_token: process.env.BOT_ACCESS_TOKEN,
 access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
});*/

var T = new Twit(config);

/* T.post('statuses/update', {status: 'Look I am tweeting!'}, function(err, data, response) {
  console.log(data)
}); */

function random_from_array(images){
  return images[Math.floor(Math.random() * images.length)];
}

function upload_random_image(images){
  console.log('Opening an image...');
  var image_path = path.join(__dirname, '/images/' + random_from_array(images)),
    b64content2 = fs.readFileSync(image_path, { encoding: 'base64' });
    // console.log("b64content2")
    // console.log(b64content2)
    picUrl = random_from_array([
      'https://animals.sandiegozoo.org/sites/default/files/2016-10/animals_hero_capybara.jpg',
      'https://www.woburnsafari.co.uk/media/3250816/capybara_2-1.jpg?width=920&height=460&mode=crop'
    ])

    b64content = getImage(picUrl, function (err, data) {
      if (err) {
        throw new Error(err);
      }
    //   return data;
    // })
    // console.log("b64content")
    // console.log(b64content)
  // console.log(data)
    console.log('Uploading an image...');

    T.post('media/upload', { media_data: data }, function (err, data, response) {
      if (err){
        console.log('ERROR:');
        console.log(err);
      }
      else{
        console.log('Image uploaded!');
        console.log('Now tweeting it...');

        T.post('statuses/update', {
          /* You can include text with your image as well. */
          // status: 'New picture!',
          /* Or you can pick random text from an array. */
          status: random_from_array([
            'capybaras are actually large rodents',
            'a fully grown capybara reaches 4 feet in length and weight of 140 pounds',
            'female capybaras are larger than males',
            'capybaras are herbivores (eat plants). they graze grass and eat aquatic plants most of the night. they also eat fruit and bark of the tree.',
            'capybaras regurgitate their food and chew it several times',
            'jaguars, anacondas, caimans, harpy eagles hunt and eat capybaras :(',
            'when capybaras sense danger, they produce warning bark which alerts other members of the group',
            'capybaras live in large groups, from 10-30 members',
            'capybaras usually have one litter per year. pregnancy lasts 5-6 months and ends with 4 babies',
            'capybaras live 8-10 years in the wild and up to 12 years in captivity',
            'capybaras need water to keep their dry skin moist and are found only in areas with abundant water sources',
            'capybaras are social creatures',
            'capybaras are most active during dawn or dusk',
            'capybara eat mostly water plants and grasses, though grain, melons and squash can also be on the menu',
            'around a year old, capybara pups leave their parent’s groups to find new ones',
            'the scientific name for a capybara is Hydrochoerus hydrochaeris',
            'capybaras are listed as least concern by the IUCN',
            'capybaras can stay underwater for up to five minutes at a time, according to the San Diego Zoo',
            'the scientific name for capybara comes from Hydro chaeris, which means "water hog" in Greek',
            'an Amazon tribe calls the capybara Kapiyva or "master of the grasses" in their native language',
            'capybaras inhabit southern Central America and northern South America in both savannas and rain forests near ponds, rivers, or lakes',
            'capybaras webbed feet help them maneuver in water and traverse soft, muddy ground',
            'capybaras facial features are located towards the top of their large heads, allowing them see and breathe while swimming',
            'capybaras can press their ears against their heads to keep water out',
            'capybaras have special digestive adaptations that allow them to absorb enough nutrients from their highly fibrous diet',
            'capybaras eat their own droppings – an activity called coprophagy',
            'a typical capybara group includes one dominant male, several females, their offspring, and a few subordinate males',
            'two male capybaras might fight for dominance. they will charge each other, rear up onto their hind legs, and engage in a scuffle until one flees the scene',
            'baby capybaras are not effective swimmers at first, so they stay on land, hiding under brushy cover',
            'capybara populations have been largely affected by hunting in the past',
            'people eat capybara meat and produce leather from their skin',
            'capybaras are closely related to guinea pigs and rock cavies, and more distantly related to chinchillas and agouti',
            'capybaras have reddish to dark brown fur that is long and brittle—perfect for drying out quickly on land',
            'along with the seasons, the presence of predators affects what time of day capybaras are active—which may be day or night, and is often at dawn and dusk',
            'like other rodents, capybaras’ teeth grow continuously, and they wear them down by grazing on aquatic plants, grasses, and other plentiful plants',
            'capybara poo is most protein rich in the morning from the high number of microbes digesting the previous day’s meals',
            'capybaras don’t mind being alone',
            'because their meat can be consumed during lent, capybaras are eaten more before Easter',
            'capybaras are the largest living rodents on Earth.',
            'today, it is prohibited to hunt capybaras in Brazil, while in Venezuela its hunting is regulated',
            'as they are rodents, capybaras have a sharp set of teeth and could potentially be dangerous, but they rarely bite humans',
            'capybaras got their name from the Tupi language from Brazil',
            'capybaras literal translation means “one who eats slender leaves”',
            'like many other rodents, capybaras mostly hop!',
            'other animals love to use the capybara as a chair',
            'capybaras have webbed feet',
            'there are hot springs in Japan that are home to capybaras',
            'japan recently organized a capybara bathing competition',
            'capybara have vestigial tails',
            'capybara feet enable them to wade in the water and keep their balance',
            'the “living chairs” and “nature’s ottoman” are other names used to refer to the capybaras',
            'capybaras are a friendly animal allowing animals to play around it as much as they like',
            'besides their being sociable, the capybaras also have a heavy, barrel-shaped body that enables it to carry other animals',
            'no matter how far away from home they go in search of food, the capybaras always return home',
            'capybaras depend on their excellent sense of smell to trace their steps; a process called scent making',
            'capybaras have two types of scents: the morillo and the anal glands',
            'for males, the anal glands have detachable hairs attached to them',
            'male capybara anal gland hairs have a coating of scent on them released when they come into contact with objects such as plants',
            'as the capybara moves around feeding on varieties of plants, it marks every plant along the way with its scent',
            'to get back home the capybara just follows the smell of its path',
            'capybaras can be sun burned',
            'capybara hair is not enough to cover their whole body which about 1.2 meters long and 0.6 meters wide',
            'capybaras are susceptible to sunburns',
            'in order to protect their skin from the sun’s heat, capybaras seek cover in water or mud',
            'capybaras lack the down hair and ground hair',
            'capybara get on very well with other capybara',
            'capybara have something in common with hippos; their eyes, nostrils and ears are all located at the top of their head meaning that it can learn all it needs to learn about its surroundings whilst keeping most of its body hidden underwater',
            'in the 16th century the capybara was classified as a fish by the Catholic Church so that the meat could be eaten on Fridays and during Lent',
            'capybaras have been known to run as fast as a horse',
            'kids may find this animals nickname "water hog" amusing, but as the name implies, capyabara are found in places where water is plentiful',
            'the capybara often competes with farm animals for food',
            'travel in search of food may take Capybaras far from their homes, but they almost always return to the same exact spot',
            'capybaras are known for making a variety of vocal noises to communicate',
            'capybaras often squeal, whistle, grunt, bark and purr',
            'twilight, early morning and sunset are the most active hours for capybaras',
            'capybaras have a scent gland located on their nose which resembles a bump and they use it to mark their territory',
            'capybaras mate only in the water and the male is always the single dominant male from the group',
            'nurturing mothers will nurse and care for any of the young within the group for the first 16 weeks',
            'once you learn a bit more about these rodents of unusual size it’s hard not to find their super-serious faces and sturdy shapes adorable',
            'capybaras are usually friendly but people who have been bitten by them report their teeth as being sharp',
            'capybaras are amazing swimmers',
            'capybaras can be pets',
            'capybaras kept as pets have been known to mow lawns for extra snacking',
            'capybaras are the life of the party',
            'sometimes as many as a 100 capybaras will gather together',
            'capybaras are social and playful animals.',
            'capybaras are very chatty, they make noise all the time when they’re together, either clicking, whistling or purring',
            'when capybaras want to sound an alarm they bark like dogs',
            'capybaras are the favourite food of anacondas, one of the largest types of snakes in the world',
            'a lot of creatures find capybaras tasty it seems, including jaguars, eagles, piranha, pumas and ocelots',
            'many countries have restrictions about hunting capybaras',
            'capybara fur turns yellowish brown on the belly and sometimes black on the face',
            'capybara front legs are slightly shorter than the hind legs',
            'capyabars can sleep in water, keeping only their noses out of the water',
            'if threatened, capybaras usual response is to flee into the water',
            'capybaras can run very fast with a top speed of about 35 km/h (22 mph)',
            'capybaras share some common features with mice, squirrels, and porcupines',
            'seventy-five percent of a capybara’s diet is only three to six plant species',
            'an adult capybara can eat 2.7 to 3.6 kilograms (6 to 8 pounds) of grass per day',
            'a capybara group maintains and defends a territory that encompasses feeding and wallowing sites',
            'among male capybaras, there is a strict dominance hierarchy enforced by chasing and, rarely, fights',
            'capybara mating season is year round with peak at beginning of wet season',
            'capybaras mate only in water, and if a female does not want to mate with a certain male, she either submerges or leaves the water',
            'dominant capybara males are highly protective of the females, but they usually cannot prevent some of the subordinates from copulating',
            'capybara pups are weaned at about 3 months old, during which time they suckle both from their own mother and the other females in the group, who are usually closely related',
            'capybaras are so trainable that in Suriname a blind man once used a capybara as a guide animal',
            'capybaras are occasionally kept as pets in the United States',
            'in Japan, following the lead of Izu Shaboten Park in 1982, multiple establishments in Japan that raise capybaras have adopted the practice of having them relax in onsen during the winter',
            'the image of a capybara features on the 2-peso coin of Uruguay',
            'fossils of the extinct Pinckney’s capybara have been found in San Diego County’s Oceanside',
            'capybaras have an extremely efficient digestive system that sustains the animal while 75% of its diet encompasses only 3 – 6 species of plants',
            'during midday, as temperatures increase, Capybaras wallow in water to keep cool and then graze in late afternoons and early evenings',
            'capybaras sleep very little, usually napping throughout the day and grazing into and through the night',
            'capybaras reach sexual maturity within 18 months and breed when conditions are right, which can be once per year (in Brazil) or throughout the year (in Venezuela and Colombia)',
            'capybaras are gentle and will usually allow humans to pet and hand-feed them',
            'capybaras look a little like overgrown guinea pigs, which is no surprise: the animals are closely related',
            'capybaras have big, barrel-shaped bodies with rather square heads',
            'capybaras are rodents and around 40% of all mammals are rodents',
            'capybaras have even been spotted in Florida',
            'Native American Guarani Indians call capybaras “master of the grasses” because they like living in lush, green spaces',
            'rainforests are perfect for capybaras because they provide an ideal habitat of long grass and water',
            'capybaras are found in every South American country apart from Chile',
            'newborn capybaras are up and about after just three or four days—ready to join the group',
            'baby capybaras cant swim',
            'should they feel as though a threat is present, capybaras can also convert to completely nocturnal behavior in which they eat and socialize entirely at night',
            'after living among marshes and swamps, Capybaras have evolved to thrive in aquatic environments',
            'capybara skin needs to be kept constantly moist and their daily diet consists primarily of aquatic plants',
            'capybara may not seem like the most agile animal on the planet, but in the water they possess a striking mobility',
            'capybaras are picky eaters',
            'for most of their lives, capybaras occupy a general “home range” from five to 500 acres',
            'capybaras are also big time cuddlers, frequently touching and grooming one another',
            'the capybara is a heavy, stocky-looking animal with a short head and muzzle in comparison to its body and hardly any tail at all',
            'they have short but sturdy limbs and hoof-like claws on their toes which along with the webbing, helps the Capybara both when negotiating the slippery banks and with swimming and also prevents the Capybara from sinking too deeply into the surrounding mud',
            'capybara`s most distinctive features is the fact that their eyes, ears and nostrils are all positioned on top of its head meaning that they still have excellent sight, sound and smell whilst in the water',
            'capybara`s coming for a soak at onsens has become something of a tradition in Japan over the past 30 years or so',
            'capybara`s front teeth never stop growing',
            'a capybara population may be established in the Santa Fe River drainage in north-central Florida',
            'a capybara has also been documented in Mississippi'
          ]),
          media_ids: new Array(data.media_id_string)
        },
          function(err, data, response) {
            if (err){
              console.log('ERROR:');
              console.log(err);
            }
            else{
              console.log('Posted an image!');
            }
          }
        );
      }
    });
  })
}


fs.readdir(__dirname + '/images', function(err, files) {
  if (err){
    console.log(err);
  }
  else{
    var images = [];
    files.forEach(function(f) {
      images.push(f);
    });
    upload_random_image(images);
  }
});


/* will delete image from folder after posting

fs.unlink(image_path, function(err){
  if (err){
    console.log('ERROR: unable to delete image ' + image_path);
  }
  else{
    console.log('image ' + image_path + ' was deleted');
  }
});
*/
