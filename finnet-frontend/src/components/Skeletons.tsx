
export function UsersListSkeleton() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-6 h-6 bg-slate-200 rounded-full animate-pulse"></div>
        <div className="h-6 w-20 bg-slate-200 rounded-lg animate-pulse"></div>
      </div>
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-200 rounded-2xl animate-pulse shrink-0"></div>
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-slate-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2 animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PostsSkeleton() {
  return (
    <div className="space-y-5">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-3xl shadow-lg p-8 border border-slate-100">
          <div className="h-7 bg-slate-200 rounded-lg w-2/3 mb-3 animate-pulse"></div>
          <div className="space-y-2 mb-6">
            <div className="h-5 bg-slate-200 rounded w-full animate-pulse"></div>
            <div className="h-5 bg-slate-200 rounded w-full animate-pulse"></div>
            <div className="h-5 bg-slate-200 rounded w-3/4 animate-pulse"></div>
          </div>
          <div className="h-4 bg-slate-200 rounded w-1/3 animate-pulse"></div>
        </div>
      ))}
    </div>
  );
}

export function CreatePostFormSkeleton() {
  return (
    <div className="space-y-5 bg-white rounded-3xl shadow-xl p-7 mb-7 border border-slate-100">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-slate-200 rounded-xl animate-pulse"></div>
        <div className="h-6 bg-slate-200 rounded-lg w-40 animate-pulse"></div>
      </div>
      <div>
        <div className="h-4 bg-slate-200 rounded w-16 mb-2 animate-pulse"></div>
        <div className="w-full h-14 bg-slate-200 rounded-2xl animate-pulse"></div>
      </div>
      <div>
        <div className="h-4 bg-slate-200 rounded w-16 mb-2 animate-pulse"></div>
        <div className="w-full h-36 bg-slate-200 rounded-2xl animate-pulse"></div>
      </div>
      <div className="w-full h-14 bg-slate-200 rounded-2xl animate-pulse"></div>
    </div>
  );
}
