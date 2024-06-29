import { TagInput } from '@/components/tag-input'

export default async function TagInputPage() {
  return (
    <div className="max-w-sm space-y-3">
      <h3 className="font-bold text-xl">{`<tag-input />`}</h3>
      <TagInput
        data-default-tags={['santa@claus.co']}
        data-size="sm"
        type="email"
      />
      <TagInput
        data-default-tags={['santa@claus.co']}
        data-size="md"
        type="email"
      />
      <TagInput
        data-default-tags={['santa@claus.co']}
        data-size="lg"
        type="email"
      />
    </div>
  )
}
