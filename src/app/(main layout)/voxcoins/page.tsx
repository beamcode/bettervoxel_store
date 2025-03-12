import Container from "@/components/Container"
import { TbCubeSpark } from "react-icons/tb"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "VoxCoins",
  description:
    "Add VoxCoins to your account to unlock exclusive features and support the platform.",
}

// Data ordered from most expensive to least expensive
const data = [
  { price: "€99,99", voxCoins: 3500, savings: 75 },
  { price: "€49,99", voxCoins: 1500, savings: 50 },
  { price: "€9,99", voxCoins: 250, savings: 25 },
  { price: "€4,99", voxCoins: 100, savings: 0 },
]

interface DataItem {
  price: string
  voxCoins: number
  savings: number
}

export default function Page() {
  return (
    <Container mainContainer centered className="flex flex-col justify-center">
      <div className="mb-8 max-w-2xl space-y-4 self-center text-center">
        <h1 className="text-3xl font-bold md:text-6xl">Up to 75% more with higher bundles !</h1>
        <p className="text-sm md:text-lg">
          Get the best value for your money with our premium plans and unlock exclusive features.
        </p>
      </div>

      <div className="rounded-md border bg-primary p-2">
        <table className="table-auto">
          <colgroup>
            <col className="w-1/2" />
            <col className="w-1/2" />
            <col className="w-auto" />
          </colgroup>

          <thead className="border-b border-primary">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                Savings
              </th>
              <th
                scope="col"
                className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider"
              >
                VoxCoins
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border-primary">
            {data.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-bold">
                    <span className="text-lg md:text-xl">{item.price}</span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span className="text-lg text-green-500 dark:text-green-400 md:text-xl">
                      {item.savings > 0 ? `+${item.savings}%` : ""}
                    </span>
                  </td>
                  <td className="flex w-min flex-row whitespace-nowrap px-2 py-2 text-sm">
                    <button className="flex w-24 items-center justify-center gap-1 rounded-md border border-secondary bg-secondary p-1">
                      <TbCubeSpark size={20} className="text-yellow-400" />
                      <h4 className="text-base font-bold md:text-lg">{item.voxCoins}</h4>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <p className="text-[12px] text-tertiary">
          {
            "By purchasing VoxCoins on BetterVoxel, you get a limited, non-refundable, and non-transferable license to use them in-game. Subscribing to Premium means you're over 18 and agree to monthly charges until canceled, plus our Terms of Service and Privacy Policy. Cancel anytime in account settings; current billing period charges still apply."
          }
        </p>
      </div>
    </Container>
  )
}
