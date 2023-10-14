# app/models/task.rb
class Task < ApplicationRecord
  self.primary_key = 'id'
  self.table_name = 'tasks'
  
  belongs_to :status, foreign_key: 'status_ID', primary_key: 'id', class_name: 'Status'
end