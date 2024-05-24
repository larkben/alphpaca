import { Button } from "../components/ui/button"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "../components/ui/dropdown-menu"
import Link from "next/link"
import { JSX, SVGProps } from "react"

export function Marketplace() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-gray-500 dark:text-gray-400">Discover our latest collection</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <PackageIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            <span className="font-medium">142 items</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                <FilterIcon className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <TagIcon className="w-4 h-4 mr-2" />
                Price
              </DropdownMenuItem>
              <DropdownMenuItem>
                <TagIcon className="w-4 h-4 mr-2" />
                Category
              </DropdownMenuItem>
              <DropdownMenuItem>
                <StarIcon className="w-4 h-4 mr-2" />
                Rating
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
          <Link className="absolute inset-0 z-10" href="#">
            <span className="sr-only">View</span>
          </Link>
          <img
            alt="Product 1"
            className="object-cover w-full h-64"
            height={400}
            src="/placeholder.svg"
            style={{
              aspectRatio: "500/400",
              objectFit: "cover",
            }}
            width={500}
          />
          <div className="bg-white p-4 dark:bg-gray-950">
            <h3 className="font-bold text-xl">Classic Leather Shoes</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Elegant and comfortable</p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">$59.99</span>
              <Button size="sm">Add to Cart</Button>
            </div>
          </div>
        </div>
        <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
          <Link className="absolute inset-0 z-10" href="#">
            <span className="sr-only">View</span>
          </Link>
          <img
            alt="Product 2"
            className="object-cover w-full h-64"
            height={400}
            src="/placeholder.svg"
            style={{
              aspectRatio: "500/400",
              objectFit: "cover",
            }}
            width={500}
          />
          <div className="bg-white p-4 dark:bg-gray-950">
            <h3 className="font-bold text-xl">Designer Handbag</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Fashion statement</p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">$89.99</span>
              <Button size="sm">Add to Cart</Button>
            </div>
          </div>
        </div>
        <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
          <Link className="absolute inset-0 z-10" href="#">
            <span className="sr-only">View</span>
          </Link>
          <img
            alt="Product 3"
            className="object-cover w-full h-64"
            height={400}
            src="/placeholder.svg"
            style={{
              aspectRatio: "500/400",
              objectFit: "cover",
            }}
            width={500}
          />
          <div className="bg-white p-4 dark:bg-gray-950">
            <h3 className="font-bold text-xl">Wireless Earbuds</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Crystal clear audio</p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">$69.99</span>
              <Button size="sm">Add to Cart</Button>
            </div>
          </div>
        </div>
        <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
          <Link className="absolute inset-0 z-10" href="#">
            <span className="sr-only">View</span>
          </Link>
          <img
            alt="Product 4"
            className="object-cover w-full h-64"
            height={400}
            src="/placeholder.svg"
            style={{
              aspectRatio: "500/400",
              objectFit: "cover",
            }}
            width={500}
          />
          <div className="bg-white p-4 dark:bg-gray-950">
            <h3 className="font-bold text-xl">Vintage Pocket Watch</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Antique charm</p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">$79.99</span>
              <Button size="sm">Add to Cart</Button>
            </div>
          </div>
        </div>
        <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
          <Link className="absolute inset-0 z-10" href="#">
            <span className="sr-only">View</span>
          </Link>
          <img
            alt="Product 5"
            className="object-cover w-full h-64"
            height={400}
            src="/placeholder.svg"
            style={{
              aspectRatio: "500/400",
              objectFit: "cover",
            }}
            width={500}
          />
          <div className="bg-white p-4 dark:bg-gray-950">
            <h3 className="font-bold text-xl">Cozy Knit Sweater</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Soft and warm</p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">$49.99</span>
              <Button size="sm">Add to Cart</Button>
            </div>
          </div>
        </div>
        <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
          <Link className="absolute inset-0 z-10" href="#">
            <span className="sr-only">View</span>
          </Link>
          <img
            alt="Product 6"
            className="object-cover w-full h-64"
            height={400}
            src="/placeholder.svg"
            style={{
              aspectRatio: "500/400",
              objectFit: "cover",
            }}
            width={500}
          />
          <div className="bg-white p-4 dark:bg-gray-950">
            <h3 className="font-bold text-xl">Minimalist Backpack</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Durable and stylish</p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">$99.99</span>
              <Button size="sm">Add to Cart</Button>
            </div>
          </div>
        </div>
        <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
          <Link className="absolute inset-0 z-10" href="#">
            <span className="sr-only">View</span>
          </Link>
          <img
            alt="Product 7"
            className="object-cover w-full h-64"
            height={400}
            src="/placeholder.svg"
            style={{
              aspectRatio: "500/400",
              objectFit: "cover",
            }}
            width={500}
          />
          <div className="bg-white p-4 dark:bg-gray-950">
            <h3 className="font-bold text-xl">Bamboo Sunglasses</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Eco-friendly and stylish</p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">$39.99</span>
              <Button size="sm">Add to Cart</Button>
            </div>
          </div>
        </div>
        <div className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2">
          <Link className="absolute inset-0 z-10" href="#">
            <span className="sr-only">View</span>
          </Link>
          <img
            alt="Product 8"
            className="object-cover w-full h-64"
            height={400}
            src="/placeholder.svg"
            style={{
              aspectRatio: "500/400",
              objectFit: "cover",
            }}
            width={500}
          />
          <div className="bg-white p-4 dark:bg-gray-950">
            <h3 className="font-bold text-xl">Ceramic Mug Set</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Handcrafted and durable</p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-lg">$24.99</span>
              <Button size="sm">Add to Cart</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  )
}


function PackageIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m7.5 4.27 9 5.15" />
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  )
}


function StarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}


function TagIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
    </svg>
  )
}
