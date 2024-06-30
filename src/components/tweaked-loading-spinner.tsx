import LoadingSpinner from "./LoadingSpinner";

export default function TweakedLoadingSpinner() {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-20">
      <LoadingSpinner />
    </div>
  );
}
