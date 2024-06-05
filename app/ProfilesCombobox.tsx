'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useDebounce } from 'react-use'
import { createClient } from '@/utils/supabase/client'
import { type Tables } from '@/types/supabase'
import { useRouter, useSearchParams } from 'next/navigation'
// import { CommandLoading } from 'cmdk'

export default function ProfilesCombobox(props: {
  autoFocus?: boolean
  defaultValue?: string
  name: string
  onChange?: (value: string) => void
  profiles: Tables<'profiles'>[] | null
  value?: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(props.defaultValue ?? '')
  const [search, setSearch] = useState('')
  const [profiles, setProfiles] = useState<Tables<'profiles'>[]>(
    props.profiles ?? [],
  )
  // const [loading, setLoading] = useState(false)

  const supabase = createClient()

  useDebounce(
    () => {
      async function fetchUsers() {
        const { data } = await supabase
          .from('profiles')
          .select()
          .or(`full_name.ilike.%${search}%,username.ilike.%${search}%`)
          .order('full_name')
          .limit(10)
        if (data) setProfiles(data)
        // setLoading(false)
      }
      if (search.length > 0) fetchUsers()
    },
    500,
    [search],
  )

  const selectedProfile = profiles.find(
    profile => profile.id === (props.value ?? value),
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          autoFocus={props.autoFocus}
          aria-expanded={open}
          className={cn(
            'bg-orange-100 flex h-12 items-center justify-between rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-950',
            selectedProfile ? 'pl-2 pr-4' : 'px-4',
          )}
          name={props.name}
          role="combobox"
          value={props.value ?? value}
        >
          <input type="hidden" name={props.name} value={props.value ?? value} />
          {props.value ?? value ? (
            <span className="flex gap-2 items-center">
              {selectedProfile?.avatar_url ? (
                <Image
                  alt="Avatar"
                  className="rounded-full"
                  height={32}
                  src={
                    supabase.storage
                      .from('avatars')
                      .getPublicUrl(selectedProfile.avatar_url).data.publicUrl
                  }
                  width={32}
                />
              ) : (
                <div className="bg-orange-300 flex items-center justify-center rounded-full size-8">
                  {selectedProfile?.full_name?.charAt(0).toUpperCase()}
                </div>
              )}
              <span>{selectedProfile?.full_name}</span>
            </span>
          ) : (
            'Select user...'
          )}
          <ChevronsUpDown className="ml-3 h-5 w-5 shrink-0 stroke-orange-950" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-0">
        <Command>
          <CommandInput
            onValueChange={e => {
              // setLoading(true)
              setSearch(e)
            }}
            placeholder="Search users..."
            required
            value={search}
          />
          {/* {loading && <CommandLoading>Fetching users...</CommandLoading>} */}
          <CommandEmpty>No user found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {profiles.map(profile => {
                const keywords: string[] = []
                if (profile.full_name) keywords.push(profile.full_name)
                return (
                  <CommandItem
                    key={profile.id}
                    keywords={keywords}
                    onSelect={currentValue => {
                      const newValue =
                        currentValue === (props.value ?? value)
                          ? ''
                          : currentValue
                      ;(props.onChange ?? setValue)(newValue)
                      const newSearchParams = new URLSearchParams(
                        searchParams.toString(),
                      )
                      if (newValue === '') newSearchParams.delete(props.name)
                      else newSearchParams.set(props.name, newValue)
                      router.replace(`?${newSearchParams.toString()}`)
                      setOpen(false)
                    }}
                    value={profile.id}
                  >
                    <Check
                      className={cn(
                        'mr-3 size-5',
                        value === profile.id ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                    <span className="flex grow items-center justify-between">
                      <span>{profile.full_name}</span>
                      {profile.avatar_url ? (
                        <Image
                          alt="Avatar"
                          className="rounded-full"
                          height={32}
                          src={
                            supabase.storage
                              .from('avatars')
                              .getPublicUrl(profile.avatar_url).data.publicUrl
                          }
                          width={32}
                        />
                      ) : (
                        <div className="bg-orange-300 flex items-center justify-center rounded-full size-8">
                          {profile.full_name?.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
