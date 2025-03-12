import Container from "@/components/Container"
import GamesSwiper from "@/components/GamesSwiper"
import type { Game } from "@/components/GamesSwiper"
import { FaChevronRight } from "react-icons/fa6"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Catalog",
  description: "Explore our collection of games.",
}

// make interface for games here
const games: Game[] = [
  {
    id: 1,
    title: "Voxel Craft",
    description: "Create, build, and explore endless voxel worlds with limitless creativity.",
    likes: 12000,
    image: "/images/voxel-house.jpg",
  },
  {
    id: 2,
    title: "Cube Adventures",
    description: "Embark on thrilling voxel-based quests filled with enemies and treasures.",
    likes: 9500,
    image: "/images/cubes-world-game.webp",
  },
  {
    id: 3,
    title: "Voxel Racer",
    description: "High-speed voxel car racing through dynamic tracks and environments.",
    likes: 8400,
    image: "/images/voxel-car.jpg",
  },
  {
    id: 4,
    title: "Pixel Fortress",
    description: "Build and defend your voxel kingdom from invading forces.",
    likes: 7700,
    image: "/images/castle-image.jpg",
  },
  {
    id: 5,
    title: "Cyber Voxel",
    description: "A futuristic voxel world filled with cybernetic challenges.",
    likes: 9100,
    image: "/images/cyber-cube.webp",
  },
  {
    id: 6,
    title: "Voxel Pets",
    description: "Raise and interact with adorable voxel-based creatures.",
    likes: 6800,
    image: "/images/dog-voxel.jpg",
  },
  {
    id: 7,
    title: "Pumpkin Quest",
    description: "A spooky voxel adventure through haunted lands.",
    likes: 7400,
    image: "/images/pumpkin-voxel.png",
  },
  {
    id: 8,
    title: "Flappy Voxel",
    description: "Fly through endless obstacles in this voxel twist on a classic game.",
    likes: 6000,
    image: "/images/flappyvoxel.png",
  },
  {
    id: 9,
    title: "Voxel Hitman",
    description: "Take on stealth missions in a stylish voxel world.",
    likes: 8200,
    image: "/images/voxel-hitman.jpg",
  },
  {
    id: 10,
    title: "Rainbow Cubes",
    description: "Solve vibrant voxel puzzles with colorful cubes.",
    likes: 7000,
    image: "/images/rainbow-cube-animated.gif",
  },
  {
    id: 11,
    title: "Voxel Chef",
    description: "Cook up delicious voxel meals in a creative kitchen.",
    likes: 6500,
    image: "/images/voxelkitchen.jpg",
  },
  {
    id: 12,
    title: "Castle Builders",
    description: "Construct massive voxel castles and defend them from attackers.",
    likes: 7300,
    image: "/images/castle-image.jpg",
  },
  {
    id: 13,
    title: "Voxel Wars",
    description: "Strategize and conquer in a war-torn voxel world.",
    likes: 7800,
    image: "/images/battle-boss-game.jpg",
  },
  {
    id: 14,
    title: "Space Voxels",
    description: "Explore and colonize distant voxel planets.",
    likes: 8600,
    image: "/images/spaceship.png",
  },
  {
    id: 15,
    title: "Voxel Explorers",
    description: "Discover hidden secrets in vast voxel lands.",
    likes: 9200,
    image: "/images/desert.png",
  },
  {
    id: 16,
    title: "Haunted Voxels",
    description: "Navigate haunted voxel houses and solve mysteries.",
    likes: 6900,
    image: "/images/cottage-house.webp",
  },
  {
    id: 17,
    title: "Blocky Battle",
    description: "Engage in tactical voxel warfare.",
    likes: 8100,
    image: "/images/battle-boss-game.jpg",
  },
  {
    id: 18,
    title: "Voxel Islands",
    description: "Survive on isolated voxel islands.",
    likes: 7800,
    image: "/images/land.jpg",
  },
  {
    id: 19,
    title: "Cube Engineers",
    description: "Design voxel machines and contraptions.",
    likes: 8700,
    image: "/images/editor.png",
  },
  {
    id: 20,
    title: "Voxel Jungle",
    description: "Explore dense voxel jungles full of danger.",
    likes: 6500,
    image: "/images/voxel-trees.png",
  },
  {
    id: 21,
    title: "Temple Blocks",
    description: "Solve puzzles inside ancient voxel temples.",
    likes: 7700,
    image: "/images/temple.jpg",
  },
  {
    id: 22,
    title: "Pixel Pirates",
    description: "Sail the voxel seas and search for treasure.",
    likes: 7900,
    image: "/images/water-fall-map.jpg",
  },
  {
    id: 23,
    title: "Battle Cubes",
    description: "Fight in arenas made of destructible voxel blocks.",
    likes: 8800,
    image: "/images/color-cubes.png",
  },
  {
    id: 24,
    title: "Future Voxels",
    description: "Experience a futuristic voxel society.",
    likes: 9600,
    image: "/images/future-transport.jpg",
  },
  {
    id: 25,
    title: "Innovative Cubes",
    description: "Push voxel design to the limits with innovation.",
    likes: 9900,
    image: "/images/innovative.webp",
  },
]

function Featured() {
  const HeroContent = ({
    imageUrl,
    title,
    link,
    description,
  }: {
    imageUrl: string
    title: string
    link: string
    description: string
  }) => (
    <Link href={link} className="group relative block size-full cursor-pointer">
      <div
        className="absolute inset-0 size-full bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.03]"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 -bottom-[0.2rem] h-32"
        style={{
          mask: "linear-gradient(transparent, black)",
          backdropFilter: "blur(25px)",
        }}
      />
      <div className="absolute inset-x-0 bottom-0 flex h-fit justify-between p-2 md:p-4">
        <div className="text-white">
          <h1 className="text-lg font-bold md:text-2xl">{title}</h1>
          <p className="text-xs md:text-sm">{description}</p>
        </div>
        <div className="hidden aspect-square items-center justify-center rounded-md text-lg font-bold text-white md:flex">
          <FaChevronRight size={28} />
        </div>
      </div>
    </Link>
  )

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Featured Games</h1>
      <div className="grid min-h-72 grid-cols-2 gap-4 md:grid-cols-2 lg:min-h-72 lg:grid-cols-4">
        <div className="col-span-2 overflow-hidden rounded-md bg-primary md:col-span-2">
          <HeroContent
            imageUrl="/images/battle-boss-game.jpg"
            title="Battle Boss"
            link="#"
            description="Voxel Warfare"
          />
        </div>
        <div className="col-span-1 overflow-hidden rounded-md bg-primary">
          <HeroContent
            imageUrl="/images/cubes-world-game.webp"
            title="Cube World"
            link="#"
            description="Voxel Adventures"
          />
        </div>
        <div className="col-span-1 overflow-hidden rounded-md bg-primary">
          <HeroContent
            imageUrl="/images/2d-cyber-game.jpg"
            title="Cyber City"
            link="#"
            description="2D Cyberpunk Game"
          />
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Container mainContainer className="space-y-8 md:space-y-14">
      <Featured />
      <div className="space-y-12">
        <div>
          <h1 className="mb-4 text-3xl font-bold">Popular Games</h1>
          <GamesSwiper gamesList={games} />
        </div>

        <div>
          <h1 className="mb-4 text-3xl font-bold">New Releases</h1>
          <GamesSwiper gamesList={[...games].reverse()} />
        </div>

        <div>
          <h1 className="mb-4 text-3xl font-bold">Top Rated</h1>
          <GamesSwiper
            gamesList={[...games].sort((a, b) => b.likes - a.likes)}
            className={"h-52"}
          />
        </div>
      </div>
    </Container>
  )
}
