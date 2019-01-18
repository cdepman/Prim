<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
    dark
  >
    <v-card>
      <v-card-title>
        <span class="headline">
          {{ formTitle }}
        </span>
      </v-card-title>

      <v-card-text>
        <v-layout justify-center column fill-height>
            <v-text-field
              v-model="person.firstName"
              label="First Name"
            ></v-text-field>
            <v-text-field
              v-model="person.lastName"
              label="Last Name"
            ></v-text-field>
            <v-text-field
              v-model="person.birthdate"
              label="Birthdate"
            ></v-text-field>
            <v-text-field
              v-model="person.middleName"
              label="Middle Name"
            ></v-text-field>
        </v-layout>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          flat
          @click="closeDialog"
        >
          Cancel
        </v-btn>
        <v-btn
          color="blue darken-1"
          flat
          @click="addPerson"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
