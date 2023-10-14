# app/models/status.rb
class Status < ApplicationRecord
  self.primary_key = 'id'
  self.table_name = 'statuses'

  has_many :tasks, foreign_key: 'status_ID', primary_key: 'id'
end