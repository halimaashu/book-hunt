"use client";

import { authClient } from "@/lib/auth-client";
import { Envelope, Pencil } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { CgUserAdd } from "react-icons/cg";

export function EditFrom() {
  const handelUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());
    const { name, image } = userData;
    await authClient.updateUser({
      image: image,
      name: name,
    });
  };
  return (
    <Modal>
      <Button variant="secondary">
        <Pencil />
        Edit profile
      </Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <CgUserAdd />
              </Modal.Icon>
              <Modal.Heading>Edit profile</Modal.Heading>
              <p className="mt-1.5 text-sm leading-5 text-muted">
                make sure your profile editing is need !!
              </p>
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form onSubmit={handelUpdate} className="flex flex-col gap-4">
                  <TextField className="w-full" name="name" type="text">
                    <Label>Name</Label>
                    <Input placeholder="Enter your name" />
                  </TextField>

                  <TextField className="w-full" name="image" type="tel">
                    <Label>Image</Label>
                    <Input placeholder="Enter your Image url" />
                  </TextField>
                  <Modal.Footer>
                    <Button slot="close" variant="secondary">
                      Cancel
                    </Button>
                    <Button type="submit">Save</Button>
                  </Modal.Footer>
                </form>
              </Surface>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
