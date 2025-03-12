export default function CardIcon() {
  return (
    <div className="relative h-56 w-96 rounded-xl bg-red-100 text-white">
      <img
        className="relative h-full w-full rounded-xl object-cover"
        src="https://i.imgur.com/kGkSg1v.png"
      />

      <div className="absolute top-8 w-full px-8">
        <div className="flex justify-between">
          <div className="">
            <p className="font-light">Name</p>
            <p className="font-medium tracking-widest">Martin Xavier</p>
          </div>
          <img className="h-14 w-14" src="https://i.imgur.com/bbPHJVe.png" />
        </div>
        <div className="pt-1">
          <p className="font-light">Card Number</p>
          <p className="tracking-more-wider font-medium">4642 3489 9867 7632</p>
        </div>
        <div className="pr-6 pt-6">
          <div className="flex justify-between">
            <div className="">
              <p className="text-xs font-light">Valid</p>
              <p className="text-sm font-medium tracking-wider">11/15</p>
            </div>
            <div className="">
              <p className="text-xs font-light">Expiry</p>
              <p className="text-sm font-medium tracking-wider">03/25</p>
            </div>

            <div className="">
              <p className="text-xs font-light">CVV</p>
              <p className="tracking-more-wider text-sm font-bold">···</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
