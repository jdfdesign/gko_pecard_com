source 'https://rubygems.org'

group :assets do
  gem 'sass-rails', '~> 3.2.6'
  gem 'coffee-rails', '~> 3.2.2'
  gem 'uglifier', '>= 1.2.6'
end

group :production do
  git "git@github.com:jdfdesign/gko_cms3.git", :tag => "v0.8.09.rc8" do
    gem 'gko_core'
    gem "gko_auth"
    gem "gko_documents"
    gem "gko_inquiries"
    gem "gko_categories"
    gem "gko_portfolio" 
    gem "gko_image_bank" 
  end
end

#group :development do
#  gem "gko_core", :path => '~/Github/gko_cms3/gko_core'
#  gem "gko_auth", :path => '~/Github/gko_cms3/gko_auth'
#  gem "gko_documents", :path => '~/Github/gko_cms3/gko_documents'
#  gem "gko_inquiries", :path => '~/Github/gko_cms3/gko_inquiries'
#  gem "gko_categories", :path => '~/Github/gko_cms3/gko_categories'
#  gem "gko_portfolio", :path => '~/Github/gko_cms3/gko_portfolio'
#  gem "gko_image_bank", :path => '~/Github/gko_cms3/gko_image_bank'
#end