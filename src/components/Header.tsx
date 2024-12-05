export function Header() {
  return (
    <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-center">
          <div className="flex items-center gap-3">
            <img 
              src="https://www.appraisily.com/wp-content/uploads/2023/12/logo.jpg" 
              alt="Appraisily Logo" 
              className="h-8 w-auto" 
            />
            <span className="text-xl font-bold text-gray-900">APPRAISILY</span>
          </div>
        </div>
      </div>
    </header>
  );
}