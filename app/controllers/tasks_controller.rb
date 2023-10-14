# app/controllers/tasks_controller.rb
class TasksController < ApplicationController
  def index
    all_tasks = Task.all
    statuses = Status.all

    this_week_tasks = all_tasks.select { |task| (Time.new - task.deadline) / (7 * 24 * 60 * 60) > -1 }
    next_week_tasks = all_tasks.select { |task| (Time.new - task.deadline) / (7 * 24 * 60 * 60) > -2 && (Time.new - task.deadline) / (7 * 24 * 60 * 60) < -1 }

    this_week_tasks.each do |task|
      task.days_left = ((task.deadline - Time.now) / (24 * 60 * 60)).to_i
      total_duration = task.deadline - task.created_at
      elapsed_duration = Time.now - task.created_at
      task.percentage_complete = (elapsed_duration / total_duration.to_f * 100).to_i
    end
  
    next_week_tasks.each do |task|
      task.days_left = ((task.deadline - Time.now) / (24 * 60 * 60)).to_i
      total_duration = task.deadline - task.created_at
      elapsed_duration = Time.now - task.created_at
      task.percentage_complete = (elapsed_duration / total_duration.to_f * 100).to_i
    end

    @statuses = statuses
    @this_week_tasks = this_week_tasks
    @next_week_tasks = next_week_tasks
  end

  def add
  end

  def update
    @task = Task.find(params[:id])
    if @task.update(status_ID: params[:status_ID])
      @task = Task.joins(:status).select('tasks.*, statuses.name AS status_name, statuses.color AS status_color').find(params[:id])
      render json: @task
    else
      render json: { error: 'Failed to update task status' }, status: :unprocessable_entity
    end
  end
end