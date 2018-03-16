# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
dog_attributes = [
  {
    id: 1,
    name: 'Archie',
    age: 6,
    enjoys: "Playing with rocks."
  },
  {
    id: 2,
    name: 'Dury',
    age: 15,
    enjoys: "Running away."
  },
  {
    id: 3,
    name: 'Spot',
    age: 6,
    enjoys: "Hide under the car."
  },
  {
    id: 4,
    name: 'Abbey',
    age: 8,
    enjoys: "Stealing human food"
  },
  {
    id: 5,
    name: 'Felix',
    age: 4,
    enjoys: 'Long naps on the couch, and a warm fire.'
  },
  {
    id: 6,
    name: 'Bilbo',
    age: 2,
    enjoys: 'Running'
  }
]

dog_attributes.each do |attributes|
  Dog.create(attributes)
end
