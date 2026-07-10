export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-ink-600 py-16 text-center">
      {Icon && <Icon className="h-8 w-8 text-mist-400" />}
      <h3 className="font-display text-lg text-mist-50">{title}</h3>
      {description && <p className="max-w-sm text-sm text-mist-400">{description}</p>}
      {action}
    </div>
  )
}
