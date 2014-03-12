template "/etc/nginx/sites-abailable/default" do
  source "sites-available.erb"
end

service "nginx" do
  action :reload
end

directory "/var/www/dogecoin_gateway" do
  owner "deploy"
  action :create
end

template "/etc/init/dogecoin_gateway.conf" do
  source "dogecoin_gateway.conf.erb"
end

service "dogecoin_gateway" do
  provider Chef::Provider::Service::Upstart
  action :start
end

