interface PageTemplateProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly description: string;
  readonly gradientFrom: string;
  readonly gradientTo: string;
  readonly children?: React.ReactNode;
}

function PageTemplate({
  title,
  subtitle,
  description,
  gradientFrom,
  gradientTo,
  children,
}: PageTemplateProps) {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${gradientFrom} ${gradientTo} py-12 px-4`}
    >
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 font-mono">
          {title}
        </h1>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-lg text-gray-600 mb-6 font-mono">{description}</p>
          {subtitle && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                {subtitle}
              </h2>
              {children && <div className="text-gray-600">{children}</div>}
            </div>
          )}
          {!subtitle && children && <div className="mt-6">{children}</div>}
        </div>
      </div>
    </div>
  );
}

export default PageTemplate;
