export default function Footer() {
    return (
      <div className="text-center mt-4 text-lg cursor-default text-gray-600">
        <p className="space-x-2">
          Project by 
          <span className="relative group inline-block">
            <span className="ml-1 hover:scale-110 transition-all hover:text-muted-foreground">0008-BSCS-22</span>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-sm bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              Zaid Bin Zaheer
            </span>
          </span>
          and
          <span className="relative group inline-block">
            <span className="ml-1 hover:scale-110 transition-all hover:text-muted-foreground">0022-BSCS-22</span>
            <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-sm bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              Sharjeel Ahmed
            </span>
          </span>
        </p>
      </div>
    );
  }
  