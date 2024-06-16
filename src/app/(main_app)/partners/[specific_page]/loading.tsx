import Loading3Dots from "@/components/Loading3Dots"

export default function Loading() {
  // used to show loading animation on async fetches in server components
  // so for example, if im fetching data in a server component (like page.tsx),
  // then NextJS will show this loading animation while the data is being fetched (optimized as well)
  return <Loading3Dots />;
}
