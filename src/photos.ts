// Every photo on the site, with its description (alt text), in one place.
//
// Importing an image file in Astro gives you an object with its path, width
// and height. Pass it to <Photo src={…} /> and Astro makes resized, modern-format
// copies at build time (see components/Photo.astro).
//
// To add a photo: put the file in src/assets/photos/<category>/, import it
// below, and add it to the right category with a description of what's in it.
import type { ImageMetadata } from "astro";

import abimbolaPortrait from "./assets/photos/about/abimbola-portrait.jpg";

import dAndTMonogram from "./assets/photos/wedding/d-and-t-monogram.jpg";
import whiteRufflesGreenery from "./assets/photos/wedding/white-ruffles-greenery.jpg";
import brideToBeCupcakes from "./assets/photos/wedding/bride-to-be-cupcakes.jpg";

import heartBlackBows from "./assets/photos/birthday/heart-black-bows.jpg";
import heartRedBows from "./assets/photos/birthday/heart-red-bows.jpg";
import redCrown from "./assets/photos/birthday/red-crown.jpg";
import turquoiseDrip from "./assets/photos/birthday/turquoise-drip.jpg";
import navyGoldMyKing from "./assets/photos/birthday/navy-gold-my-king.jpg";
import white60th from "./assets/photos/birthday/white-60th.jpg";
import blackGoldMyDiamond from "./assets/photos/birthday/black-gold-my-diamond.jpg";

import pinkButterfliesThird from "./assets/photos/childrens/pink-butterflies-third.jpg";
import jungleFirst from "./assets/photos/childrens/jungle-first.jpg";
import fairyGarden from "./assets/photos/childrens/fairy-garden.jpg";
import hotAirBalloons from "./assets/photos/childrens/hot-air-balloons.jpg";
import cloudsTeddyFirst from "./assets/photos/childrens/clouds-teddy-first.jpg";

import ohBabyBlue from "./assets/photos/baby-shower/oh-baby-blue.jpg";
import genderReveal from "./assets/photos/baby-shower/gender-reveal.jpg";
import thirtyAndBlooming from "./assets/photos/baby-shower/thirty-and-blooming.jpg";

import sageRuffles from "./assets/photos/budget-friendly/sage-ruffles.jpg";
import ohBabyBear from "./assets/photos/budget-friendly/oh-baby-bear.jpg";
import burgundyPiping from "./assets/photos/budget-friendly/burgundy-piping.jpg";
import creamGoldRibbons from "./assets/photos/budget-friendly/cream-gold-ribbons.jpg";

import strawberryBoard from "./assets/photos/cupcakes/strawberry-board.jpg";
import strawberryVanilla from "./assets/photos/cupcakes/strawberry-vanilla.jpg";
import strawberryChocolatePair from "./assets/photos/cupcakes/strawberry-chocolate-pair.jpg";
import strawberryRedVelvet from "./assets/photos/cupcakes/strawberry-red-velvet.jpg";
import vanillaStack from "./assets/photos/cupcakes/vanilla-stack.jpg";
import vanillaBoard from "./assets/photos/cupcakes/vanilla-board.jpg";

import wrappedSlicesEvent from "./assets/photos/cake-slices/wrapped-slices-event.jpg";
import boxedSlices from "./assets/photos/cake-slices/boxed-slices.jpg";

import slabCakeBoxed from "./assets/photos/christmas/slab-cake-boxed.jpg";
import slabCakeClose from "./assets/photos/christmas/slab-cake-close.jpg";
import slabCakesPair from "./assets/photos/christmas/slab-cakes-pair.jpg";

// Not used on the site, but kept in src/assets/photos: near-duplicates of
// photos above (cupcakes/strawberry-board-wide, strawberry-vanilla-close and
// cake-slices/boxed-slices-alt).

export type SitePhoto = { src: ImageMetadata; alt: string };

export const photos = {
	// Not a cake, so not in galleryCategories. Her face is in the top third:
	// use object-top wherever it's cropped.
	about: {
		abimbolaPortrait: {
			src: abimbolaPortrait,
			alt: "Abimbola, the baker behind Light Cakes, in a red suit against a warm brown backdrop",
		},
	},
	wedding: {
		dAndTMonogram: {
			src: dAndTMonogram,
			alt: "Tall white wedding cake with gold D & T initials, gold pearls and a ruffled buttercream base",
		},
		whiteRufflesGreenery: {
			src: whiteRufflesGreenery,
			alt: "White ruffled wedding cake with sage-green succulents and a monogram topper, surrounded by candles",
		},
		brideToBeCupcakes: {
			src: brideToBeCupcakes,
			alt: "Box of rose-piped cupcakes with gold pearls, lilac bows and a 'Bride to Be' topper",
		},
	},
	birthday: {
		heartBlackBows: {
			src: heartBlackBows,
			alt: "Pale yellow heart-shaped vintage cake with piped buttercream and black satin bows",
		},
		heartRedBows: {
			src: heartRedBows,
			alt: "Cream heart-shaped vintage cake with pearl piping, red bows and a gold Happy Birthday topper",
		},
		redCrown: {
			src: redCrown,
			alt: "Deep red vintage-style birthday cake with piped rosettes, red ribbons and a gold crown",
		},
		turquoiseDrip: {
			src: turquoiseDrip,
			alt: "Tall turquoise drip cake with navy drips, blue and gold spheres and a Happy Birthday topper",
		},
		navyGoldMyKing: {
			src: navyGoldMyKing,
			alt: "Tall navy birthday cake with gold leaf, blue spheres, a gold palm fan and a 'Happy Birthday My King' topper",
		},
		white60th: {
			src: white60th,
			alt: "Ridged white 60th birthday cake with a gold 60 topper and touches of gold leaf",
		},
		blackGoldMyDiamond: {
			src: blackGoldMyDiamond,
			alt: "Black and white birthday cake with gold and black spheres, gold leaf and a 'Happy Birthday My Diamond' topper",
		},
	},
	childrens: {
		pinkButterfliesThird: {
			src: pinkButterfliesThird,
			alt: "Pink ombré third birthday cake covered in paper butterflies, with a gold 3 and the name Ani",
		},
		jungleFirst: {
			src: jungleFirst,
			alt: "Green jungle-themed first birthday cake with a giraffe, lion, zebra and tiger, and the name Feranmi",
		},
		fairyGarden: {
			src: fairyGarden,
			alt: "Two-tier lilac fairy garden cake with fairies, butterflies, toadstools, flowers and the name Anna",
		},
		hotAirBalloons: {
			src: hotAirBalloons,
			alt: "Two-tier sky-blue first birthday cake with hot-air balloons, clouds and a 'Nathan Turns One' topper",
		},
		cloudsTeddyFirst: {
			src: cloudsTeddyFirst,
			alt: "Sky-blue first birthday cake with fondant clouds, a teddy bear and a gold Tomitan topper",
		},
	},
	babyShower: {
		ohBabyBlue: {
			src: ohBabyBlue,
			alt: "Tall cream baby shower cake with blue textured buttercream, a gold 'oh baby' topper and a teddy bear",
		},
		genderReveal: {
			src: genderReveal,
			alt: "Half pink, half blue gender reveal cake reading Girl and Boy, topped with two teddy bears",
		},
		thirtyAndBlooming: {
			src: thirtyAndBlooming,
			alt: "White cake with a gold outline of an expectant mother, cream roses and a '30 & Blooming' topper",
		},
	},
	budgetFriendly: {
		sageRuffles: {
			src: sageRuffles,
			alt: "Cream buttercream cake with sage-green ruffled piping, pearls and a gold Happy Birthday topper",
		},
		ohBabyBear: {
			src: ohBabyBear,
			alt: "Small cream cake with a brown piped border, a teddy bear, 'oh baby' lettering and ribbon bows",
		},
		burgundyPiping: {
			src: burgundyPiping,
			alt: "Ridged white birthday cake with burgundy piped borders, gold sprinkles and a Happy Birthday topper",
		},
		creamGoldRibbons: {
			src: creamGoldRibbons,
			alt: "Cream vintage-style birthday cake with piped buttercream and gold ribbons",
		},
	},
	cupcakes: {
		strawberryBoard: {
			src: strawberryBoard,
			alt: "Vanilla, red velvet and chocolate cupcakes topped with buttercream and fresh strawberries on a wooden board",
		},
		strawberryVanilla: {
			src: strawberryVanilla,
			alt: "Vanilla cupcake with a buttercream swirl and half a fresh strawberry",
		},
		strawberryChocolatePair: {
			src: strawberryChocolatePair,
			alt: "Two chocolate cupcakes topped with buttercream and fresh strawberries",
		},
		strawberryRedVelvet: {
			src: strawberryRedVelvet,
			alt: "Red velvet cupcakes topped with buttercream and fresh strawberries",
		},
		vanillaStack: {
			src: vanillaStack,
			alt: "A stack of three golden vanilla cupcakes",
		},
		vanillaBoard: {
			src: vanillaBoard,
			alt: "Golden vanilla cupcakes on a wooden board",
		},
	},
	cakeSlices: {
		wrappedSlicesEvent: {
			src: wrappedSlicesEvent,
			alt: "Rows of individually wrapped cake slices with wooden forks and ribbon ties, ready to hand out at an event",
		},
		boxedSlices: {
			src: boxedSlices,
			alt: "Boxed slices of vanilla, chocolate and red velvet sponge",
		},
	},
	christmas: {
		slabCakeBoxed: {
			src: slabCakeBoxed,
			alt: "Christmas slab cake in a gift box, piped with red, green and cream rosettes and a Merry Christmas topper",
		},
		slabCakeClose: {
			src: slabCakeClose,
			alt: "Close-up of a Christmas slab cake with red, green and cream buttercream rosettes",
		},
		slabCakesPair: {
			src: slabCakesPair,
			alt: "Two boxed Christmas slab cakes with buttercream rosettes, one piped with Merry Christmas",
		},
	},
} satisfies Record<string, Record<string, SitePhoto>>;

// Gallery page sections, in display order. id is the #anchor for jump links.
export const galleryCategories = [
	{ id: "wedding", title: "Wedding cakes", photos: Object.values(photos.wedding) },
	{ id: "birthday", title: "Birthday cakes", photos: Object.values(photos.birthday) },
	{ id: "childrens", title: "Children's cakes", photos: Object.values(photos.childrens) },
	{ id: "baby-shower", title: "Baby shower cakes", photos: Object.values(photos.babyShower) },
	{ id: "budget-friendly", title: "Budget-friendly cakes", photos: Object.values(photos.budgetFriendly) },
	{ id: "cupcakes", title: "Cupcakes", photos: Object.values(photos.cupcakes) },
	{ id: "cake-slices", title: "Cake slices", photos: Object.values(photos.cakeSlices) },
	{ id: "christmas", title: "Christmas slab cakes", photos: Object.values(photos.christmas) },
];
