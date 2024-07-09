import { inviteUserByEmail } from '@/actions/inviteUserByEmail'
import { FormField, FormLabel } from '@/components/form'
import { Button } from '@/components/button'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/dialog'
import { Input } from '@/components/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Should fetch this somehow
enum Role {
  Admin = 'admin',
  Participant = 'participant',
}

export default async function InvitePersonDialogContent() {
  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle>Invite person</DialogTitle>
        <DialogDescription>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          reiciendis nulla debitis.
        </DialogDescription>
      </DialogHeader>
      <form action={inviteUserByEmail} className="flex flex-col gap-[inherit]">
        <FormField>
          <div className="gap-4 grid grid-cols-[65px_1fr]">
            <FormLabel
              className="justify-self-end self-center text-base"
              htmlFor="email"
            >
              Email
            </FormLabel>
            <Input id="email" name="email" type="email" />
          </div>
        </FormField>
        <FormField>
          <div className="gap-4 grid grid-cols-[65px_1fr]">
            <FormLabel
              className="justify-self-end self-center text-base"
              htmlFor="role"
            >
              Role
            </FormLabel>
            <Select defaultValue={Role.Participant} name="role">
              <SelectTrigger className="capitalize">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Role).map(role => (
                  <SelectItem key={role} className="capitalize" value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </FormField>
        <Button>Send invite</Button>
      </form>
    </DialogContent>
  )
}
